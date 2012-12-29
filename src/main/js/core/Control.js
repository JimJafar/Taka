/*global window:false */
var Taka = (Taka) ? Taka : {};

/**
 * Handles user input (singleton)
 * @class
 */
Taka.core.Control = (function() {
    "use strict";
    /**
     * @lends Taka.core.Control
     */
    return {
        /**
         * Handles a key press
         * @param {Event} e The onKeyDown event
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
         * Handles a key release
         * @param {Event} e The onKeyUp event
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