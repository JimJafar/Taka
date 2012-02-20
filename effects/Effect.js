(function(Taka) {
	var Effect = function(sprites, width, height, x, y, velX, velY) {
		this.sprites = sprites;
		this.width = width;
		this.height = height;
		this.x = x - (width / 2);
		this.y = y - (height / 2);
	};
	Effect.prototype.sprites = null;
	Effect.prototype.width = 0;
	Effect.prototype.height = 0;
	Effect.prototype.x = 0;
	Effect.prototype.y = 0;
	Effect.prototype.velX = 0;
	Effect.prototype.velY = 0;
	Effect.prototype.finished = false;
	Effect.prototype.frame = -1;
	
	Effect.prototype.getVelocity = function() {
		return { x: this.velX, y: this.velY };
	};
	
	Effect.prototype.setPos = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	Effect.prototype.getPos = function() {
		return { x: this.x, y: this.y };
	};
	
	Effect.prototype.getSprite = function() {
		this.frame++;
		if (this.frame == this.sprites.length-1) this.finished = true;
		return this.sprites[this.frame];
	};
	
	Taka.effects.Effect = Effect;
})(Taka);