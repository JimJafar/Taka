var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
    var Formation = function(shipType, startFrame, x, y) {
        this.shipType = shipType;
        this.startFrame = startFrame;
        this.x = x;
        this.y = y;
    };

    Formation.prototype.update = function() {

    };

    Taka.vehicles.formations.Formation = Formation;
})(Taka);