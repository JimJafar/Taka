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
     * A keyboard event
     * @memberof Taka.core.Control
     * @type Event
     * @private
     */
    var _event;

    /**
     * The keycode associated with a keyboard event
     * @memberof Taka.core.Control
     * @type string
     * @private
     */
    var _code;

    /**
     * Prevents event bubbling up and any possible default effect on the browser
     * @memberof Taka.core.Control
     * @param {Event} event
     * @private
     */
    var _stopPropagation = function(event) {
        if(event.stopPropagation) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };

    /**
     * Updates the _event and _code variables
     * @memberof Taka.core.Control
     * @param {Event} e
     * @private
     */
    var _getEventAndCode = function(e) {
        if(window.event) {
            _event = window.event;
            _code = _event.keyCode;
        } else {
            _event = e;
            _code = _event.which;
        }
    };

    /**
     * @lends Taka.core.Control
     */
    return {
        /**
         * Handles a key press
         * @param {Event} e The onKeyDown event
         */
        keyDown: function(e) {
            _getEventAndCode(e);
            switch(_code) {
                case TakaConfig.buttons.up:
                    Taka.core.Engine.Player().moveUp = true;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.down:
                    Taka.core.Engine.Player().moveDown = true;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.left:
                    Taka.core.Engine.Player().moveLeft = true;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.right:
                    Taka.core.Engine.Player().moveRight = true;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.fire:
                    Taka.core.Engine.Player().fire = true;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.pause:
                    Taka.core.Engine.Pause();
                    _stopPropagation(_event);
                    break;
            }
        },

        /**
         * Handles a key release
         * @param {Event} e The onKeyUp event
         */
        keyUp: function(e) {
            _getEventAndCode(e);
            switch(_code) {
                case TakaConfig.buttons.up:
                    Taka.core.Engine.Player().moveUp = false;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.down:
                    Taka.core.Engine.Player().moveDown = false;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.left:
                    Taka.core.Engine.Player().moveLeft = false;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.right:
                    Taka.core.Engine.Player().moveRight = false;
                    _stopPropagation(_event);
                    break;
                case TakaConfig.buttons.fire:
                    Taka.core.Engine.Player().fire = false;
                    _stopPropagation(_event);
                    break;
            }
        }
    };
})();