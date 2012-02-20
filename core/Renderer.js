/**
 * @name Renderer
 * @class Renderer The game renderer (singleton)
 * @author Jim Sangwine
 */
Taka.core.Renderer = (function() {
	/**
	 * @name _canvas
	 * @function _canvas A reference to the canvas DOM object the game will be rendered in
	 * @private
	 */
	var _canvas = null;
	
	/**
	 * @name _context
	 * @function _context A reference to the 2D context of the game canvas
	 * @private
	 */
	var _context = null;
	
	/**
	 * @name _canvasWidth
	 * @function _canvasWidth The width of the game canvas in pixels
	 * @private
	 */
	var _canvasWidth = 0;
	
	/**
	 * @name _canvasHeight
	 * @function _canvasHeight The height of the game canvas in pixels
	 * @private
	 */
	var _canvasHeight = 0;
	
	return {
		/**
		 * @name getCanvas
		 * @function getCanvas Returns the game canvas
		 * @public
		 */
		getCanvas: function() {
			return _canvas;
		},
		
		/**
		 * @name setCanvas
		 * @function setCanvas A setter for the game canvas - also sets _context, _canvasWidth & _canvasHeight
		 * @public
		 */
		setCanvas: function(canvas) {
			_canvas = canvas;
			_context = canvas.getContext('2d');
			_canvasWidth = canvas.width;
			_canvasHeight = canvas.height;
			Taka.core.Engine.setGameDimensions(canvas.width, canvas.height);
		},
		
		/**
		 * @name Render
		 * @function Render Renders a frame to the game canvas
		 * @param _frame The current frame number
		 * @public
		 */
		Render: function(_frame) {
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
			for (var i=enemies.length-1; i>=0; i--) {
				enemy = enemies[i];
				_context.drawImage(enemy.getSprite(), enemy.x, enemy.y);
			}

			// draw the player bullets
			var bullets = Taka.core.Engine.PlayerBullets();
			var bullet;
			for (var i=bullets.length-1; i>=0; i--) {
				bullet = bullets[i];
				_context.drawImage(bullet.getSprite(), bullet.x, bullet.y);
			}

			// draw the enemy bullets
			bullets = Taka.core.Engine.EnemyBullets();
			for (var i=bullets.length-1; i>=0; i--) {
				bullet = bullets[i];
				_context.drawImage(bullet.getSprite(), bullet.x, bullet.y);
			}

			// draw the effects
			var effects = Taka.core.Engine.Effects();
			var effect;
			for (var i=effects.length-1; i>=0; i--) {
				effect = effects[i];
				_context.drawImage(effect.getSprite(), effect.x, effect.y);
			}
		}
	};
})();