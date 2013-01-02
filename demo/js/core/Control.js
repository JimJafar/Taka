/*global window:false */
var Taka = (Taka) ? Taka : {};
var TakaConfig = (TakaConfig) ? TakaConfig : {};

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
                case TakaConfig.buttons.up:
                    Taka.core.Engine.Player().moveUp = true;
                    break;
                case TakaConfig.buttons.down:
                    Taka.core.Engine.Player().moveDown = true;
                    break;
                case TakaConfig.buttons.left:
                    Taka.core.Engine.Player().moveLeft = true;
                    break;
                case TakaConfig.buttons.right:
                    Taka.core.Engine.Player().moveRight = true;
                    break;
                case TakaConfig.buttons.fire:
                    Taka.core.Engine.Player().fire = true;
                    break;
                case TakaConfig.buttons.pause:
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
                case TakaConfig.buttons.up:
                    Taka.core.Engine.Player().moveUp = false;
                    break;
                case TakaConfig.buttons.down:
                    Taka.core.Engine.Player().moveDown = false;
                    break;
                case TakaConfig.buttons.left:
                    Taka.core.Engine.Player().moveLeft = false;
                    break;
                case TakaConfig.buttons.right:
                    Taka.core.Engine.Player().moveRight = false;
                    break;
                case TakaConfig.buttons.fire:
                    Taka.core.Engine.Player().fire = false;
                    break;
            }
        }
    };
})();