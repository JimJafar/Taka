(function() {

    "use strict";

    /**
     * A formation shaped like a V comprising 5 enemy vehicles
     * @class
     * @augments Taka.vehicles.formations.Formation
     * @param {Function} shipType A class derived from Taka.vehicles.Vehicle
     * @param {Number} startFrame The frame number on which to spawn the formation
     * @param {Number} x The position of the formation in the X axis
     * @param {Number} y The position of the formation in the Y axis
     * @constructor
     */
    Taka.vehicles.formations.V5Formation = function(shipType, startFrame, x, y) {
        var vehiclePosVels = [
            { x: x,      y: -20, velX: 0.5, velY: 1 },
            { x: x - 30, y: -40, velX: 0.5, velY: 1 },
            { x: x + 30, y: -40, velX: 0.5, velY: 1 },
            { x: x - 60, y: -60, velX: 0.5, velY: 1 },
            { x: x + 60, y: -60, velX: 0.5, velY: 1 }
        ];

        return new Taka.vehicles.formations.Formation(shipType, startFrame, x, y, vehiclePosVels);
    };

})();