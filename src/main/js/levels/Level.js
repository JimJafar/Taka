var Taka = (Taka) ? Taka : {};

(function(Taka) {
    "use strict";
	var Level = function() {
		this.currentTrigger = this.triggers[0];
		this.currentTriggerNum = 0;
	};
	Level.prototype.triggers = [];
	Level.prototype.currentTrigger = null;
	Level.prototype.currentTriggerNum = null;

	Level.prototype.update = function(frameNum) {
		if (!this.currentTrigger) {
            return;
        }
		
		if (frameNum === this.currentTrigger.frame) {
			this.currentTrigger.execute();
			this.currentTriggerNum++;
			this.currentTrigger = this.triggers[this.currentTriggerNum];
		}
	};

	Taka.levels.Level = Level
})(Taka);