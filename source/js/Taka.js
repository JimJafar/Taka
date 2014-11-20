/*global document:false */

/**
 * The Taka namespace
 * @namespace
 * @global
 * @author Jim Sangwine
 */
var Taka = (function() {

    "use strict";

    return {
        /**
         * The utils namespace
         * @namespace
         */
        utils: {},

        /**
         * The core namespace
         * @namespace
         */
        core: {},

        /**
         * The assets namespace
         * @namespace
         * @memberof Taka
         */
        assets: {},

        /**
         * The levels namespace
         * @namespace
         */
        levels: {},

        /**
         * The ordnance namespace
         * @namespace
         */
        ordnance: {},

        /**
         * The effects namespace
         * @namespace
         */
        effects: {},

        /**
         * The vehicles namespace
         * @namespace
         */
        vehicles: {
            /**
             * The formations namespace
             * @namespace
             */
            formations: {}
        },

        /**
         * Enables inheritance
         * @param {*} dest The derived class
         * @param {*} source The base class
         **/
        extend: function (dest, source) {
            if (!dest || !source) {
                return;
            }
            /*jshint forin:false */
            for(var proto in source.prototype) {
                dest.prototype[proto] = source.prototype[proto];
            }
            dest.prototype.Super = source;
        },

        /**
         * Starts the game engine
         * @param canvas The canvas to render to
         * @param callback An optional callback function to be invoked on every frame
         */
        start: function (canvas, callback) {
            Taka.core.Timer.start(canvas, callback);
            document.onkeyup = Taka.core.Control.keyUp;
            document.onkeydown = Taka.core.Control.keyDown;
        },

        /**
         * Stops the game engine
         */
        stop: function () {
            Taka.core.Timer.stop();
            document.onkeyup = null;
            document.onkeydown = null;
        },

        /**
         * Called when the player dies
         */
        gameOver: function () {
            this.stop();
        }
    };
})();