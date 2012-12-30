var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * Base class for bullets
     * @param {Image} sprite The image asset
     * @param {Number} width Width in pixels
     * @param {Number} height Height in pixels
     * @param {Number} x Position in the X axis
     * @param {Number} y Position in the Y axis
     * @param {Number} speed Speed in pixels per frame
     * @param {Number} damage The amount of hit points of damage dealt
     * @constructor
     */
    Taka.ordnance.Bullet = function(sprite, width, height, x, y, speed, damage) {
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

    Taka.ordnance.Bullet.prototype = {
        /**
         * Updates the bullet's velocity in each axis based on speed and direction of movement
         */
        updateVelocity : function() {
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
        },

        /**
         * Returns the current velocity in each axis
         * @return {{x: number, y: number}}
         */
        getVelocity : function() {
            return { x: this.velX, y: this.velY };
        },

        /**
         * Sets the position
         * @param {Number} x Position in the X axis (in pixels)
         * @param {Number} y Position in the Y axis (in pixels)
         */
        setPos : function(x,y) {
            this.x = x;
            this.y = y;
        },

        /**
         * Gets the current position
         * @return {{x: number, y: number}}
         */
        getPos : function() {
            return { x: this.x, y: this.y };
        },

        /**
         * Gets the image asset
         * @return {Image}
         */
        getSprite : function() {
            return this.sprite;
        }
    };
})();