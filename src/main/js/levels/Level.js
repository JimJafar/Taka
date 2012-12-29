var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * Base class for levels
     * @class
     * @constructor
     */
    Taka.levels.Level = function() {
        this.nextTrigger = this.triggers[0];
        this.nextTriggerNum = 0;
    };

    Taka.levels.Level.prototype = {
        /**
         * Collection of time-based triggers (e.g. spawning an enemy or a formation)
         * @type {Array}
         */
        triggers : [],

        /**
         * The next trigger in the queue
         * @type {function}
         */
        nextTrigger : null,

        /**
         * The zero-based unique sequential number of the next trigger in the queue
         * @type {Number}
         */
        nextTriggerNum : null,

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