var Taka = (Taka) ? Taka : {};

(function(Taka) {
    var Player = function(x, y) {
        var sprite = Taka.assets.Assets.load('Player', 'src/main/resources/vehicles/Player.png');
        var width = 59;
        var height = 43;
        var speed = 3;
        var fireFreq = 300;

        this.Super(sprite, width, height, x, y, speed, fireFreq);
    };
    Taka.extend(Player, Taka.vehicles.Ship);

    Player.prototype.getBullet = function() {
        return this._getBullet(Taka.ordnance.PlayerBullet);
    };

    Taka.vehicles.Player = Player;
})(Taka);