var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
    var Bullet = function(sprite, width, height, x, y, speed, damage) {
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;

        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.velX = 0;
        this.velY = 0;
    };

    Bullet.prototype.updateVelocity = function() {
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

    Bullet.prototype.getVelocity = function() {
        return { x: this.velX, y: this.velY };
    };

    Bullet.prototype.setPos = function(x,y) {
        this.x = x;
        this.y = y;
    };

    Bullet.prototype.getPos = function() {
        return { x: this.x, y: this.y };
    };

    Bullet.prototype.getSprite = function() {
        return this.sprite;
    };

    Taka.ordnance.Bullet = Bullet;
})(Taka);