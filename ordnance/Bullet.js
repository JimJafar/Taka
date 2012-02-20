(function(Taka) {
	var Bullet = function(sprite, width, height, x, y, speed) {
		this.sprite = sprite;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speed = speed;
	};
	Bullet.prototype.sprite = null;
	Bullet.prototype.width = 0;
	Bullet.prototype.height = 0;
	Bullet.prototype.x = 0;
	Bullet.prototype.y = 0;
	Bullet.prototype.speed = 2;
	Bullet.prototype.moveUp = false;
	Bullet.prototype.moveDown = false;
	Bullet.prototype.moveLeft = false;
	Bullet.prototype.moveRight = false;
	Bullet.prototype.velX = 0;
	Bullet.prototype.velY = 0;
	
	Bullet.prototype.updateVelocity = function() {
		this.velX = this.velY = 0;
		if (this.moveUp) this.velY = -this.speed;
		if (this.moveDown) this.velY = this.speed;
		if (this.moveLeft) this.velX = -this.speed;
		if (this.moveRight) this.velX = this.speed;
	};
	
	Bullet.prototype.getVelocity = function() {
		return { x: this.velX, y: this.velY };
	};
	
	Bullet.prototype.setPos = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	Bullet.prototype.getPos = function() {
		return { x: this.x, y: this.y };
	};
	
	Bullet.prototype.getSprite = function() {
		return this.sprite;
	};
	
	Taka.ordnance.Bullet = Bullet;
})(Taka);