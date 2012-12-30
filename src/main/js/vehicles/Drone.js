var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * A basic enemy drone
     * @class
     * @augments Taka.vehicles.Vehicle
     * @param {Number} x Position in the X axis
     * @param {Number} y Position in the Y axis
     * @param {Number} velX Velocity in the X axis
     * @param {Number} velY Velocity in the Y axis
     * @constructor
     */
    Taka.vehicles.Drone = function(x, y, velX, velY) {
        var sprite = Taka.assets.Assets.load('Drone', 'src/main/resources/vehicles/Drone.png');
        var width = 32;
        var height = 31;
        var speed = 2;
        var life = 1;
        var fireFreq = 3600;

        this.Super(sprite, width, height, x, y, speed, life, fireFreq);

        this.velX = velX;
        this.velY = velY;
    };
    Taka.extend(Taka.vehicles.Drone, Taka.vehicles.Vehicle);

    Taka.vehicles.Drone.prototype = {
        /**
         * Updates the vehicle - called by Taka.core.Engine.Update
         * Fires periodically according to fireFreq
         */
        update : function() {
            if (new Date().getTime() - this.firedLast > this.fireFreq) {
                this.fire = true;
            }
        },

        /**
         * Creates a new instance of SmallBullet
         * @return {Taka.ordnance.SmallBullet}
         */
        getBullet : function() {
            return new Taka.ordnance.SmallBullet(this.x + (this.width / 2), this.y + this.height);
        }
    };
})();