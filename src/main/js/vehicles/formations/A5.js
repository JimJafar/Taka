var Taka = (Taka) ? Taka : {};

(function(Taka) {
    var A5 = function(shipType, startFrame, x, y) {
        this.Super(shipType, startFrame, x, y);
    };
    Taka.extend(A5, Taka.vehicles.formations.Formation);

    A5.prototype.update = function(frame) {
        if (frame === this.startFrame) {
            Taka.core.Engine.addEnemy(new this.shipType(this.x, -60, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x - 30, -40, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x + 30, -40, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x - 60, -20, -1, 2));
            Taka.core.Engine.addEnemy(new this.shipType(this.x + 60, -20, -1, 2));
        }
    };

    Taka.vehicles.formations.A5 = A5;
})(Taka);