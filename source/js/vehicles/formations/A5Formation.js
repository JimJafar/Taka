var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * A formation shaped like an A (^) comprising 5 enemy vehicles
     * @class
     * @augments Taka.vehicles.formations.Formation
     * @param {Function} shipType A class derived from Taka.vehicles.Vehicle
     * @param {Number} startFrame The frame number on which to spawn the formation
     * @param {Number} x The position of the formation in the X axis
     * @param {Number} y The position of the formation in the Y axis
     * @constructor
     */
    Taka.vehicles.formations.A5Formation = function(shipType, startFrame, x, y) {
        this.Super(shipType, startFrame, x, y);
    };
    Taka.extend(Taka.vehicles.formations.A5Formation, Taka.vehicles.formations.Formation);

    /**
     * Spawns the formation at the specified frame number
     * @param {Number} frame The frame number
     */
    Taka.vehicles.formations.A5Formation.prototype.update = function(frame) {
        if (frame === this.startFrame) {
            Taka.core.Engine.addEnemy(new this.shipType(this.x, -60, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x - 30, -40, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x + 30, -40, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x - 60, -20, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x + 60, -20, -1, 2));
        }
    };
})();