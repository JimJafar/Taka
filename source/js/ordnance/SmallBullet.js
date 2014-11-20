(function() {

    "use strict";

    /**
     * A generic small bullet for use by smaller enemies
     * @augments Taka.ordnance.Bullet
     * @param {Number} x Position in the X axis (in pixels)
     * @param {Number} y Position in the X axis (in pixels)
     * @constructor
     */
    Taka.ordnance.SmallBullet = function(x, y) {
        var sprite = Taka.assets.Assets.load('SmallBullet', 'ordnance/SmallBullet.png');
        var width = 17;
        var height = 16;
        var speed = 4;
        x -= 9;
        var damage = 1;

        var bullet = new Taka.ordnance.Bullet(sprite, width, height, x, y, speed, damage);
        bullet.moveDown = true;

        return bullet;
    };

})();