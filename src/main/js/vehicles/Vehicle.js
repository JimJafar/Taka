var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";

    /**
     * Base class for player and enemy vehicles.
     * @param {Image} sprite
     * @param {Number} width
     * @param {Number} height
     * @param {Number} x
     * @param {Number} y
     * @param {Number} speed
     * @param {Number} life
     * @param {Number} fireFreq
     * @constructor
     */
    var Vehicle = function(sprite, width, height, x, y, speed, life, fireFreq) {
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.life = life;
        this.fireFreq = fireFreq;

        this.firedLast = new Date().getTime();
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.fire = false;
        this.velX = 0;
        this.velY = 0;
    };

    Vehicle.prototype.update = function() {
        this._updateVelocity();
    };

    Vehicle.prototype._updateVelocity = function() {
        this.velX = this.velY = 0;
        if (this.moveUp) {
            this.velY = -this.speed;
        }
        if (this.moveDown) {
            this.velY = this.speed;
        }
        if (this.moveLeft) {
            this.velX = -this.speed;
        }
        if (this.moveRight) {
            this.velX = this.speed;
        }
    };

    Vehicle.prototype.getVelocity = function() {
        return { x: this.velX, y: this.velY };
    };

    Vehicle.prototype.setPos = function(x,y) {
        this.x = x;
        this.y = y;
    };

    Vehicle.prototype.getPos = function() {
        return { x: this.x, y: this.y };
    };

    Vehicle.prototype.getSprite = function() {
        return this.sprite;
    };

    Vehicle.prototype._getBullet = function(Type) {
        return new Type(this.x + (this.width / 2), this.y);
    };

    Vehicle.prototype.hit = function(damage) {
       this.life -= damage;
    };

    Vehicle.prototype.dead = function() {
        return this.life <= 0;
    };

    Taka.vehicles.Vehicle = Vehicle;
})(Taka);