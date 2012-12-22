var Taka = (Taka) ? Taka : {};

Taka.assets.Assets = (function() {
    var _cache = Taka.assets.Cache;

    return {
        /**
         * Creates a new Image instance or fetches it from the cache
         * @param {string} key The unique key to store the Image under in the cache
         * @param {string} path The path to the image file
         * @return {Image}
         */
        load : function(key, path) {
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