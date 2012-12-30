var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * Basic bullet for the player
     * @augments Taka.ordnance.Bullet
     * @param {Number} x Position in the X axis (in pixels)
     * @param {Number} y Position in the X axis (in pixels)
     * @constructor
     */
    Taka.ordnance.PlayerBullet = function(x, y) {
        var sprite = Taka.assets.Assets.load('PlayerBullet', 'src/main/resources/ordnance/PlayerBullet.png');
        var width = 17;
        var height = 16;
        var speed = 6;
        x -= 9;
        var damage = 1;

        this.Super(sprite, width, height, x, y, speed, damage);

        this.moveUp = true;
    };
    Taka.extend(Taka.ordnance.PlayerBullet, Taka.ordnance.Bullet);
})();