var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
    var PlayerBullet = function(x, y) {
        var sprite = Taka.assets.Assets.load('PlayerBullet', 'src/main/resources/ordnance/PlayerBullet.png');
        var width = 17;
        var height = 16;
        var speed = 6;
        x -= 9;
        var damage = 1;

        this.Super(sprite, width, height, x, y, speed, damage);

        this.moveUp = true;
    };
    Taka.extend(PlayerBullet, Taka.ordnance.Bullet);

    Taka.ordnance.PlayerBullet = PlayerBullet;
})(Taka);