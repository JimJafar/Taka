describe('Taka.assets.Assets', function() {
    "use strict";
    var assets = Taka.assets.Assets;
    var cache = Taka.assets.Cache;

    it('should create a new Image instance and add it to the cache if the sprite is not already cached', function() {
        var sprite = assets.load('theKey', '/path/to/img');
        expect(sprite.src.indexOf('/path/to/img')).not.toBe(-1);
        expect(cache.hasSprite('theKey')).toBe(true);
    });

    it('should fetch the Image from the cache if it is cached', function() {
        var cachedSprite = { src : '/path/to/42.png' };
        cache.addSprite(cachedSprite, '42');

        var fetchedSprite = assets.load('42', null);
        expect(fetchedSprite.src.indexOf('/path/to/42.png')).not.toBe(-1);
    });
});
