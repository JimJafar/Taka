/**
 * @name Timer
 * @class Timer The main game timer (singleton)
 * @author Jim Sangwine
 */
Taka.core.Timer = (function() {
	/**
	 * @name _run
	 * @field _run A flag indicating whether the engine is/should be running
	 * @private
	 */
	var _run = false;
	
	/**
	 * @name _interval
	 * @field _interval The tick interval in microseconds
	 * @see Taka.Config.fps
	 * @private
	 */
	var _interval = 1000 / Taka.core.Config.fps;
	
	/**
	 * @name _frame
	 * @field _frame The current frame number 
	 * @private
	 */
	var _frame = 0;
	
	/**
	 * @name _callback
	 * @function _callback A method that will be called on every tick of the engine
	 * @private
	 */
	var _callback = null;
	
	/**
	 * @name _tick
	 * @function _tick The main game engine loop
	 * @private
	 */
	function _tick() {
		if (_run) {
			_frame++;
			
			if (_callback) {
				_callback();
			}
			
			// update the engine
			Taka.core.Engine.Update(_frame);
			
			// render the frame
			Taka.core.Renderer.Render(_frame);
			
			// recurse
			setTimeout(_tick, _interval);
		}
	}
	
	return {
		/**
		 * @name start
		 * @function start Starts the game engine
		 * @param canvas The canvas to render to
		 * @param callback An optional callback function to be invoked on every tick
		 * @public
		 */
		start: function(canvas, callback) {
			_run = true;
			Taka.core.Renderer.setCanvas(canvas);
			if (callback) {
				_callback = callback;
			}
			_tick();
		},
		
		/**
		 * @name stop
		 * @function stop Stops the game engine
		 * @public
		 */
		stop: function() {
			_run = false;
		},

		/**
		 * @name frame
		 * @function frame Returns the current frame number
		 * @public
		 */
		frame: function() {
			return _frame;
		}
	};
})();