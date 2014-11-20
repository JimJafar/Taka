(function() {

    "use strict";

    /**
     * Base class for levels
     * @param triggers {Array.<Taka.levels.Trigger>}
     * @class
     * @constructor
     */
    Taka.levels.Level = function(triggers) {
        /**
         * Collection of time-based triggers (e.g. spawning an enemy or a formation)
         * @type {Array}
         */
        this.triggers = triggers;

        /**
         * The next trigger in the queue
         * @type {Taka.levels.Trigger}
         */
        this.nextTrigger = (this.triggers.length > 0) ? this.triggers[0] : null;

        /**
         * The zero-based unique sequential number of the next trigger in the queue
         * @type {Number}
         */
        this.nextTriggerNum = 0;
    };

    Taka.levels.Level.prototype = {
        /**
         * The update method - called on every frame by the engine
         * @see Taka.core.Engine.Update
         * @param {Number} frameNum The current frame number
         */
        update : function(frameNum) {
            if (!this.nextTrigger) {
                return;
            }

            if (frameNum === this.nextTrigger.frame) {
                this.nextTrigger.execute();
                this.nextTriggerNum++;
                this.nextTrigger = this.triggers[this.nextTriggerNum];
            }
        }
    };

})();