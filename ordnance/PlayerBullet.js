(function() {
	var PlayerBullet = function(x, y) {
		var sprite = Taka.assets.Assets.create('PlayerBullet', 'assets/ordnance/PlayerBullet.png');
		var width = 17;
		var height = 16;
		var speed = 6;
		this.moveUp = true;
		x -= 9;
		
		this.Super(sprite, width, height, x, y, speed);
	};
	Taka.extend(PlayerBullet, Taka.ordnance.Bullet);
	
	Taka.ordnance.PlayerBullet = PlayerBullet;
})(Taka);