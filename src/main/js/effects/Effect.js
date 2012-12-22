var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
    /**
     * Base class for animated effects
     * @param {array} sprites
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     * @param {number} velX
     * @param {number} velY
     * @constructor
     */
    var Effect = function(sprites, width, height, x, y, velX, velY) {
        this.sprites = sprites;
        this.width = width;
        this.height = height;
        this.x = x - (width / 2);
        this.y = y - (height / 2);
        this.velX = velX;
        this.velY = velY;
        this.finished = false;
        this.frame = -1;
    };

    /**
     * Gets the current velocity in x and y axes
     * @return {{ x : {number}, y : {number} }}
     */
    Effect.prototype.getVelocity = function() {
        return {
            x : this.velX,
            y : this.velY
        };
    };

    /**
     * Sets the pixel coordinates of the effect
     * @param {number} x
     * @param {number} y
     */
    Effect.prototype.setPos = function(x, y) {
        this.x = x;
        this.y = y;
    };

    /**
     * Gets the current pixel coordinates of the effect
     * @return {{ x: {number}, y: {number} }}
     */
    Effect.prototype.getPos = function() {
        return {
            x : this.x,
            y : this.y
        };
    };

    /**
     * Returns the current image in the animation sequence
     * @return {Image}
     */
    Effect.prototype.getSprite = function() {
        this.frame++;
        if (this.frame === this.sprites.length-1)
        {
            this.finished = true;
        }
        return this.sprites[this.frame];
    };

    Taka.effects.Effect = Effect;
})(Taka);