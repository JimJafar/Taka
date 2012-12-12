Taka.assets.Assets = (function() {
	var _cache = Taka.assets.Cache;

	return {
		create: function(key, path) {
			var sprite = _cache.fetchSprite(key);
			if (sprite === null) {
				sprite = new Image();
				sprite.src = path;
				_cache.addSprite(sprite, key);
			}
			return sprite;
		}
	};
})();