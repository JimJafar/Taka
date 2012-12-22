var Taka = (Taka) ? Taka : {};

(function(Taka) {
	var Ship = function(sprite, width, height, x, y, speed, fireFreq) {
		this.sprite = sprite;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.fireFreq = fireFreq;
	};
	Ship.prototype.sprite = null;
	Ship.prototype.width = 0;
	Ship.prototype.height = 0;
	Ship.prototype.x = 0;
	Ship.prototype.y = 0;
	Ship.prototype.speed = 2;
	Ship.prototype.fireFreq = 20;
	Ship.prototype.firedLast = new Date().getTime();
	Ship.prototype.moveUp = false;
	Ship.prototype.moveDown = false;
	Ship.prototype.moveLeft = false;
	Ship.prototype.moveRight = false;
	Ship.prototype.fire = false;
	Ship.prototype.velX = 0;
	Ship.prototype.velY = 0;

	Ship.prototype.update = function() {
		this._updateVelocity();
	};

	Ship.prototype._updateVelocity = function() {
		this.velX = this.velY = 0;
		if (this.moveUp) this.velY = -this.speed;
		if (this.moveDown) this.velY = this.speed;
		if (this.moveLeft) this.velX = -this.speed;
		if (this.moveRight) this.velX = this.speed;
	};
	
	Ship.prototype.getVelocity = function() {
		return { x: this.velX, y: this.velY };
	};
	
	Ship.prototype.setPos = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	Ship.prototype.getPos = function() {
		return { x: this.x, y: this.y };
	};
	
	Ship.prototype.getSprite = function() {
		return this.sprite;
	};

	Ship.prototype._getBullet = function(type) {
		return new type(this.x + (this.width / 2), this.y);
	};

	Taka.vehicles.Ship = Ship;
})(Taka);