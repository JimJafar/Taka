/**
 * @name Control
 * @class Control Handles user input (singleton)
 * @author Jim Sangwine
 */
Taka.core.Control = (function() {
	return {
		/**
		 * @name keyDown
		 * @function keyDown Handles a key press
		 * @param e The onKeyDown event
		 * @public
		 */
		keyDown: function(e) {
			var code = (window.event) ? window.event.keyCode : e.which;
			switch(code) {
				case Taka.core.Config.buttons.up:
					Taka.core.Engine.Player().moveUp = true;
					break;
				case Taka.core.Config.buttons.down:
					Taka.core.Engine.Player().moveDown = true;
					break;
				case Taka.core.Config.buttons.left:
					Taka.core.Engine.Player().moveLeft = true;
					break;
				case Taka.core.Config.buttons.right:
					Taka.core.Engine.Player().moveRight = true;
					break;
				case Taka.core.Config.buttons.fire:
					Taka.core.Engine.Player().fire = true;
					break;
				case Taka.core.Config.buttons.pause:
					Taka.core.Engine.Pause();
					break;
			}
		},
		
		/**
		 * @name keyUp
		 * @function keyUp Handles a key release
		 * @param e The onKeyUp event
		 * @public
		 */
		keyUp: function(e) {
			var code = (window.event) ? window.event.keyCode : e.which;
			switch(code) {
				case Taka.core.Config.buttons.up:
					Taka.core.Engine.Player().moveUp = false;
					break;
				case Taka.core.Config.buttons.down:
					Taka.core.Engine.Player().moveDown = false;
					break;
				case Taka.core.Config.buttons.left:
					Taka.core.Engine.Player().moveLeft = false;
					break;
				case Taka.core.Config.buttons.right:
					Taka.core.Engine.Player().moveRight = false;
					break;
				case Taka.core.Config.buttons.fire:
					Taka.core.Engine.Player().fire = false;
					break;
			}
		}
	};
})();