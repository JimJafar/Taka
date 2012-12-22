var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    var Explosion = function(x, y, velX, velY) {
        var sprites = [];
        for (var i=0; i<7; i++) {
            sprites[i] = Taka.assets.Assets.load('Explosion'+i, 'src/main/resources/effects/explosion-0'+i+'.png');
        }

        var width = 60;
        var height = 60;

        this.Super(sprites, width, height, x, y, velX, velY);
    };
    Taka.extend(Explosion, Taka.effects.Effect);

    Taka.effects.Explosion = Explosion;
})(Taka);