var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    var SmallBullet = function(x, y) {
        var sprite = Taka.assets.Assets.load('SmallBullet', 'src/main/resources/ordnance/SmallBullet.png');
        var width = 17;
        var height = 16;
        var speed = 4;
        x -= 9;
        var damage = 1;

        this.Super(sprite, width, height, x, y, speed, damage);

        this.moveDown = true;
    };
    Taka.extend(SmallBullet, Taka.ordnance.Bullet);

    Taka.ordnance.SmallBullet = SmallBullet;
})(Taka);