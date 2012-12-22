var Taka = (Taka) ? Taka : {};

/**
 * @name Cache
 * @class Cache The game asset cache (singleton)
 * @author Jim Sangwine
 */
Taka.assets.Cache = (function() {
    /**
     * @name _sprites
     * @field _sprites A collection of all sprites so far loaded
     */
    var _sprites = {};

    /**
     * @name _keys
     * @field _keys A collection of the keys for all currently cached sprites
     */
    var _keys = [];

    return {
        /**
         * @name spriteCount
         * @function spriteCount Returns the number of sprites in the cache
         * @return {Number}
         */
        spriteCount: function() {
            return _keys.length;
        },

        /**
         * @name addSprite
         * @function addSprite Adds a sprite to the cache
         * @param sprite
         * @param key
         */
        addSprite: function(sprite, key) {
            _sprites[key] = sprite;
            _keys.push(key);
        },

        /**
         * @name removeSprite
         * @function removeSprite Removes a sprite from the cache
         * @param key
         */
        removeSprite: function(key) {
            var index = _keys.indexOf(key);
            if (index === -1) return;

            _sprites[key] = null;
            delete _sprites[key];
            _keys.splice(index, 1);
        },

        /**
         * @name hasSprite
         * @function hasSprite Returns true if the cache contains a sprite matching the given key, otherwise false
         * @param key
         * @return bool
         */
        hasSprite: function(key) {
            return _sprites.hasOwnProperty(key);
        },

        /**
         * @name fetchSprite
         * @function fetchSprite Fetches a sprite from the cache
         * @param key
         */
        fetchSprite: function(key) {
            if (!_sprites.hasOwnProperty(key)) return null;
            return _sprites[key];
        },

        /**
         * @name clear
         * @function clear Clears the cache
         */
        clear: function() {
            for (var i = _keys.length - 1; i >= 0; i--) {
                _sprites[_keys[i]] = null;
            }
            _sprites = {};
            _keys = [];
        }
    };
})();
