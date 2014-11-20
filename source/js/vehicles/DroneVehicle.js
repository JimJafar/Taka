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
    Taka.vehicles.DroneVehicle = function(x, y, velX, velY) {
        var sprite = Taka.assets.Assets.load('Drone', 'vehicles/Drone.png');
        var width = 32;
        var height = 31;
        var speed = 2;
        var life = 1;
        var fireFreq = 3600;

        var onUpdate = function() {
            // Fire periodically according to fireFreq
            if (new Date().getTime() - this.firedLast > this.fireFreq) {
                this.fire = true;
            }
        };

        var drone = new Taka.vehicles.Vehicle(sprite, width, height, x, y, speed, life, fireFreq, Taka.ordnance.SmallBullet, onUpdate);

        drone.velX = velX;
        drone.velY = velY;

        return drone;
    };

})();