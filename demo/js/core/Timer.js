/*global setTimeout:false */
var Taka = (Taka) ? Taka : {};
var TakaConfig = (TakaConfig) ? TakaConfig : {};

/**
 * The main game timer (singleton)
 * @class
 */
Taka.core.Timer = (function() {
    "use strict";
    /**
     * A flag indicating whether the engine is/should be running
     * @memberof Taka.core.Timer
     * @type Boolean
     * @private
     */
    var _run = false;

    /**
     * The tick interval in microseconds
     * @memberof Taka.core.Timer
     * @type Number
     * @see TakaConfig.fps
     * @private
     */
    var _interval = 1000 / TakaConfig.fps;

    /**
     * The current frame number
     * @memberof Taka.core.Timer
     * @type Number
     * @private
     */
    var _frame = 0;

    /**
     * A method that will be called on every tick of the engine
     * @memberof Taka.core.Timer
     * @type function
     * @private
     */
    var _callback = null;

    /**
     * The main game engine loop
     * @memberof Taka.core.Timer
     * @see Taka.core.Engine.Update
     * @see Taka.core.Renderer.Render
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

    /**
     * @lends Taka.core.Timer
     */
    return {
        /**
         * Starts the game engine
         * @param {HTMLCanvasElement} canvas The canvas to render to
         * @param {function} callback An optional callback function to be invoked on every tick
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
         * Stops the game engine
         */
        stop: function() {
            _run = false;
        },

        /**
         * Returns the current frame number
         * @returns Number
         */
        frame: function() {
            return _frame;
        }
    };
})();