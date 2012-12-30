var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * The player's vehicle
     * @class
     * @augments Taka.vehicles.Vehicle
     * @param {Number} x Position in the X axis
     * @param {Number} y Position in the Y axis
     * @constructor
     */
    Taka.vehicles.PlayerVehicle = function(x, y) {
        var sprite = Taka.assets.Assets.load('Player', 'src/main/resources/vehicles/Player.png');
        var width = 59;
        var height = 43;
        var speed = 3;
        var life = 5;
        var fireFreq = 300;

        this.Super(sprite, width, height, x, y, speed, life, fireFreq);
    };
    Taka.extend(Taka.vehicles.PlayerVehicle, Taka.vehicles.Vehicle);

    /**
     * Creates a new instance of PlayerBullet
     * @return {Taka.ordnance.PlayerBullet}
     */
    Taka.vehicles.PlayerVehicle.prototype.getBullet = function() {
        return this._getBullet(Taka.ordnance.PlayerBullet);
    };
})();