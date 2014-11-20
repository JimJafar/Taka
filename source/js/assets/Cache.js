/**
 * The game asset cache
 */
Taka.assets.Cache = (function() {
    "use strict";
    /**
     * A collection of all sprites so far loaded
     * @memberof Taka.assets.Cache
     * @type object
     * @private
     */
    var _sprites = {};

    /**
     * A collection of the keys for all currently cached sprites
     * @memberof Taka.assets.Cache
     * @type array
     * @private
     */
    var _keys = [];

    /**
     * @lends Taka.assets.Cache
     **/
    return {
        /**
         * Returns the number of sprites in the cache
         * @returns {Number}
         */
        spriteCount: function() {
            return _keys.length;
        },

        /**
         * Adds a sprite to the cache
         * @param {Image} sprite
         * @param {string} key
         */
        addSprite: function(sprite, key) {
            _sprites[key] = sprite;
            _keys.push(key);
        },

        /**
         * Removes a sprite from the cache
         * @param {string} key
         */
        removeSprite: function(key) {
            var index = _keys.indexOf(key);
            if (index === -1) {
                return;
            }

            _sprites[key] = null;
            delete _sprites[key];
            _keys.splice(index, 1);
        },

        /**
         * Returns true if the cache contains a sprite matching the given key, otherwise false
         * @param {string} key
         * @returns {bool}
         */
        hasSprite: function(key) {
            return _sprites.hasOwnProperty(key);
        },

        /**
         * Fetches a sprite from the cache
         * @param {string} key
         */
        fetchSprite: function(key) {
            if (!_sprites.hasOwnProperty(key)) {
                return null;
            }
            return _sprites[key];
        },

        /**
         * Clears the cache
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
