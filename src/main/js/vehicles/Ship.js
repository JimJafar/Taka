var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
    var Ship = function(sprite, width, height, x, y, speed, life, fireFreq) {
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

    Ship.prototype.update = function() {
        this._updateVelocity();
    };

    Ship.prototype._updateVelocity = function() {
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

    Ship.prototype.getVelocity = function() {
        return { x: this.velX, y: this.velY };
    };

    Ship.prototype.setPos = function(x,y) {
        this.x = x;
        this.y = y;
    };

    Ship.prototype.getPos = function() {
        return { x: this.x, y: this.y };
    };

    Ship.prototype.getSprite = function() {
        return this.sprite;
    };

    Ship.prototype._getBullet = function(Type) {
        return new Type(this.x + (this.width / 2), this.y);
    };

    Ship.prototype.hit = function(damage) {
       this.life -= damage;
    };

    Ship.prototype.dead = function() {
        return this.life <= 0;
    };

    Taka.vehicles.Ship = Ship;
})(Taka);