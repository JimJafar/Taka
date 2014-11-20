(function() {

    "use strict";

    /**
     * Base class for formations of enemy vehicles
     * @class
     * @param {Function} shipType A class derived from Taka.vehicles.Vehicle
     * @param {Number} startFrame The frame number on which to spawn the formation
     * @param {Number} x The position of the formation in the X axis
     * @param {Number} y The position of the formation in the Y axis
     * @param {Array.<{ x:Number, y:Number, velX:Number, velY:number }>} A collection of objects representing vehicle positions and velocities
     * @constructor
     */
    Taka.vehicles.formations.Formation = function(shipType, startFrame, x, y, vehiclePosVels) {
        this.shipType = shipType;
        this.startFrame = startFrame;
        this.x = x;
        this.y = y;
        this.vehiclePosVels = vehiclePosVels;
    };

    /**
     * Update function for the formation
     * @ignore
     * @param {Number} frame The frame number
     */
    Taka.vehicles.formations.Formation.prototype.update = function(frame) {
        if (frame === this.startFrame) {
            this.vehiclePosVels.forEach(function(vehiclePosVel) {
                Taka.core.Engine.addEnemy(new this.shipType(vehiclePosVel.x, vehiclePosVel.y, vehiclePosVel.velX, vehiclePosVel.velY));
            });
        }
    };
})();