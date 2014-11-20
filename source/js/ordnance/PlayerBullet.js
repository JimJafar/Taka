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
        var sprite = Taka.assets.Assets.load('PlayerBullet', 'ordnance/PlayerBullet.png');
        var width = 17;
        var height = 16;
        var speed = 6;
        x -= 9;
        var damage = 1;

        var bullet = new Taka.ordnance.Bullet(sprite, width, height, x, y, speed, damage);
        bullet.moveUp = true;

        return bullet;
    };

})();