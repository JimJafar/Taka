var Taka = (Taka) ? Taka : {};

(function(Taka) {
	var Drone = function(x, y, velX, velY) {
		var sprite = Taka.assets.Assets.load('Drone', 'src/main/resources/vehicles/Drone.png');
		var width = 32;
		var height = 31;
		var speed = 2;
		var fireFreq = 3600;

		this.Super(sprite, width, height, x, y, speed, fireFreq);

		this.velX = velX;
		this.velY = velY;
	};
	Taka.extend(Drone, Taka.vehicles.Ship);

	Drone.prototype.update = function() {
		if (new Date().getTime() - this.firedLast > this.fireFreq) {
			this.fire = true;
		}
	};

	Drone.prototype.getBullet = function() {
		return new Taka.ordnance.SmallBullet(this.x + (this.width / 2), this.y + this.height);
	};

	Taka.vehicles.Drone = Drone;
})(Taka);