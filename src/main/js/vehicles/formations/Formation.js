var Taka = (Taka) ? Taka : {};

(function(Taka) {
	var Formation = function(shipType, startFrame, x, y) {
		this.shipType = shipType;
		this.startFrame = startFrame;
		this.x = x;
		this.y = y;
	};
	Formation.prototype.shipType = null;
	Formation.prototype.startFrame = 0;
	Formation.prototype.x = 0;
	Formation.prototype.y = 0;

	Formation.prototype.update = function() {
		
	};

	Taka.vehicles.formations.Formation = Formation;
})(Taka);