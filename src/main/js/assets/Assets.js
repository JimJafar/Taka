/*global Image:false */
var Taka = (Taka) ? Taka : {};

/**
 * Handles assets (e.g. images)
 * @class
 */
Taka.assets.Assets = (function() {
    "use strict";
    var _cache = Taka.assets.Cache;

    /**
     * @lends Taka.assets.Assets
     **/
    return {
        /**
         * Fetches an asset from disk or from the cache if it was previously requested
         * @param {string} key The unique key to store the Image under in the cache
         * @param {string} path The path to the image file (relative to Taka.Config.resourcesBaseUrl)
         * @return {Image}
         */
        load: function(key, path) {
            var sprite = _cache.fetchSprite(key);
            if (sprite === null) {
                sprite = new Image();
                sprite.src = Taka.core.Config.resourcesBaseUrl + path;
                _cache.addSprite(sprite, key);
            }
            return sprite;
        }
    };
})();