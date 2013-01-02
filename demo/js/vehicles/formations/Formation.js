var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * Base class for formations of enemy vehicles
     * @class
     * @param {Function} shipType A class derived from Taka.vehicles.Vehicle
     * @param {Number} startFrame The frame number on which to spawn the formation
     * @param {Number} x The position of the formation in the X axis
     * @param {Number} y The position of the formation in the Y axis
     * @constructor
     */
    Taka.vehicles.formations.Formation = function(shipType, startFrame, x, y) {
        this.shipType = shipType;
        this.startFrame = startFrame;
        this.x = x;
        this.y = y;
    };

    /**
     * Update function for the formation - to be implemented by derived classes
     * @ignore
     * @param {Number} frame The frame number
     */
    Taka.vehicles.formations.Formation.prototype.update = function(frame) {
        throw new Error('Taka.vehicles.formations.Formation.prototype.update should be implemented in derived classes');
    };
})();