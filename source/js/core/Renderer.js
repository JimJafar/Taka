/**
 * The game renderer
 */
Taka.core.Renderer = (function() {

    "use strict";

    /**
     * A reference to the canvas DOM object the game will be rendered in
     * @memberof Taka.core.Renderer
     * @type {HTMLCanvasElement}
     * @private
     */
    var _canvas = null;

    /**
     * A reference to the 2D context of the game canvas
     * @memberof Taka.core.Renderer
     * @type {Object}
     * @private
     */
    var _context = null;

    /**
     * The width of the game canvas in pixels
     * @memberof Taka.core.Renderer
     * @type {Number}
     * @private
     */
    var _canvasWidth = 0;

    /**
     * The height of the game canvas in pixels
     * @memberof Taka.core.Renderer
     * @type {Number}
     * @private
     */
    var _canvasHeight = 0;

    /**
     * @lends Taka.core.Renderer
     */
    return {
        /**
         * Returns the game canvas
         * @returns {HTMLCanvasElement}
         */
        getCanvas: function() {
            return _canvas;
        },

        /**
         * A setter for the game canvas - also sets _context, _canvasWidth & _canvasHeight
         * @param {HTMLCanvasElement} canvas The Canvas element
         */
        setCanvas: function(canvas) {
            _canvas = canvas;
            _context = canvas.getContext('2d');
            _canvasWidth = canvas.width;
            _canvasHeight = canvas.height;
            Taka.core.Engine.setGameDimensions(canvas.width, canvas.height);
        },

        /**
         * Renders a frame to the game canvas
         */
        Render: function() {
            var i;

            // clear the canvas
            _context.clearRect(0, 0, _canvasWidth, _canvasHeight);

            // background
            _context.fillStyle = '#ACE2F3';
            _context.fillRect(0, 0, _canvasWidth, _canvasHeight);

            // draw the player
            var player = Taka.core.Engine.Player();
            _context.drawImage(player.getSprite(), player.x, player.y);

            // draw the enemies
            var enemies = Taka.core.Engine.Enemies();
            var enemy;
            for (i=enemies.length-1; i>=0; i--) {
                enemy = enemies[i];
                _context.drawImage(enemy.getSprite(), enemy.x, enemy.y);
            }

            // draw the player bullets
            var bullets = Taka.core.Engine.PlayerBullets();
            var bullet;
            for (i=bullets.length-1; i>=0; i--) {
                bullet = bullets[i];
                _context.drawImage(bullet.getSprite(), bullet.x, bullet.y);
            }

            // draw the enemy bullets
            bullets = Taka.core.Engine.EnemyBullets();
            for (i=bullets.length-1; i>=0; i--) {
                bullet = bullets[i];
                _context.drawImage(bullet.getSprite(), bullet.x, bullet.y);
            }

            // draw the effects
            var effects = Taka.core.Engine.Effects();
            var effect;
            for (i=effects.length-1; i>=0; i--) {
                effect = effects[i];
                _context.drawImage(effect.getSprite(), effect.x, effect.y);
            }
        }
    };
})();