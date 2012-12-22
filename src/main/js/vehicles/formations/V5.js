var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
    var V5 = function(shipType, startFrame, x, y) {
        this.Super(shipType, startFrame, x, y);
    };
    Taka.extend(V5, Taka.vehicles.formations.Formation);

    V5.prototype.update = function(frame) {
        if (frame === this.startFrame) {
            Taka.core.Engine.addEnemy(new this.shipType(this.x, -20, 0.5, 1));
            Taka.core.Engine.addEnemy(new this.shipType(this.x - 30, -40, 0.5, 1));
            Taka.core.Engine.addEnemy(new this.shipType(this.x + 30, -40, 0.5, 1));
            Taka.core.Engine.addEnemy(new this.shipType(this.x - 60, -60, 0.5, 1));
            Taka.core.Engine.addEnemy(new this.shipType(this.x + 60, -60, 0.5, 1));
        }
    };

    Taka.vehicles.formations.V5 = V5;
})(Taka);