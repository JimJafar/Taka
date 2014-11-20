(function() {

    "use strict";

    /**
     * Base class for level triggers (things that happen at a given time)
     * @param frame {Number}
     * @param action {function}
     * @class
     * @constructor
     */
    Taka.levels.Trigger = function(frame, action) {
        /**
         * The frame number on which the action should occur
         * @type {Array}
         */
        this.frame = frame;

        /**
         * The action to execute
         * @type {function}
         */
        this.action = action;
    };

    Taka.levels.Trigger.prototype = {
        /**
         * Executes this.action
         */
        execute : function() {
            if (typeof this.action === 'function') {
                this.action();
            }
        }
    };

})();