(function() {
	var SmallBullet = function(x, y) {
		var sprite = Taka.assets.Assets.create('SmallBullet', 'assets/ordnance/SmallBullet.png');
		var width = 17;
		var height = 16;
		var speed = 4;
		this.moveDown = true;
		x -= 9;
		
		this.Super(sprite, width, height, x, y, speed);
	};
	Taka.extend(SmallBullet, Taka.ordnance.Bullet);
	
	Taka.ordnance.SmallBullet = SmallBullet;
})(Taka);