var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";

    /**
     * Base class for player and enemy vehicles.
     * @class
     * @param {Image} sprite The image asset
     * @param {Number} width Width of the vehicle
     * @param {Number} height Height of the vehicle
     * @param {Number} x Position in the X axis
     * @param {Number} y Position in the Y axis
     * @param {Number} speed Speed in pixels per frame
     * @param {Number} life Number of hit points
     * @param {Number} fireFreq Time between shots in microseconds
     * @constructor
     */
    Taka.vehicles.Vehicle = function(sprite, width, height, x, y, speed, life, fireFreq) {
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

    Taka.vehicles.Vehicle.prototype = {
        /**
         * Updates the vehicle - called by Taka.core.Engine.Update
         */
        update : function() {
            this._updateVelocity();
        },

        /**
         * Updates the vehicles's velocity according to speed and direction
         * @private
         */
        _updateVelocity : function() {
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
         * Gets the vehicle's velocity
         * @return {{x: number, y: number}}
         */
        getVelocity : function() {
            return { x: this.velX, y: this.velY };
        },

        /**
         * Sets the vehicle's coordinates
         * @param {Number} x Position in the X axis
         * @param {Number} y Position in the Y axis
         */
        setPos : function(x,y) {
            this.x = x;
            this.y = y;
        },

        /**
         * Gets the vehicle's coordinates
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
        },

        /**
         * Creates a new instance of Type
         * @param {function} Type A class derived from Taka.ordnance.Bullet
         * @return {Type}
         * @private
         */
        _getBullet : function(Type) {
            return new Type(this.x + (this.width / 2), this.y);
        },

        /**
         * Handles a hit from a bullet or another vehicle
         * @param damage
         */
        hit : function(damage) {
           this.life -= damage;
        },

        /**
         * Determines whether the vehicle has run out of hit points
         * @return {boolean}
         */
        dead : function() {
            return this.life <= 0;
        }
    };
})();