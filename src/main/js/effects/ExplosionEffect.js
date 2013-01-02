var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * An explosion effect - used for dying enemy vehicles
     * @class
     * @augments Taka.effects.Effect
     * @param {Number} x The position of the effect in the X axis (in pixels)
     * @param {Number} y The position of the effect in the Y axis (in pixels)
     * @param {Number} velX The velocity of the effect in the X axis
     * @param {Number} velY The velocity in the Y axis
     * @constructor
     */
    Taka.effects.ExplosionEffect = function(x, y, velX, velY) {
        var sprites = [];
        for (var i=0; i<7; i++) {
            sprites[i] = Taka.assets.Assets.load('ExplosionEffect'+i, 'effects/explosion-0'+i+'.png');
        }

        var width = 60;
        var height = 60;

        this.Super(sprites, width, height, x, y, velX, velY);
    };
    Taka.extend(Taka.effects.ExplosionEffect, Taka.effects.Effect);
})();