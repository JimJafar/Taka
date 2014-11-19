var Taka = (Taka) ? Taka : {};

describe('Taka.assets.Cache', function() {
    "use strict";
    var cache = Taka.assets.Cache;

    beforeEach(function() {
        cache.clear();
    });

    it('should be able to clear the cache', function() {
        cache.addSprite(new Image(), '42');
        cache.addSprite(new Image(), '13');
        expect(cache.spriteCount()).toBe(2);
        cache.clear();
        expect(cache.spriteCount()).toBe(0);
    });

    it('should be able to return the number of sprites in the cache', function() {
        expect(cache.spriteCount()).toBe(0);
    });

    it('should be able to add a sprite to the cache', function() {
        expect(cache.spriteCount()).toBe(0);
        cache.addSprite(new Image(), '42');
        expect(cache.spriteCount()).toBe(1);
    });

    it('should be able to remove a sprite from the cache', function() {
        cache.addSprite(new Image(), '42');
        expect(cache.spriteCount()).toBe(1);
        cache.removeSprite('42');
        expect(cache.spriteCount()).toBe(0);
    });

    it('should be able to tell if a sprite is in the cache by it\'s key', function() {
        expect(cache.hasSprite('42')).toBe(false);
        cache.addSprite(new Image(), '42');
        expect(cache.hasSprite('42')).toBe(true);
    });

    it('should be able to fetch a sprite by it\'s key', function() {
        var sprite = new Image();
        sprite.src = '/path/to/42.jpg';
        cache.addSprite(sprite, '42');
        expect(cache.fetchSprite('42').src.indexOf('/path/to/42.jpg')).not.toBe(-1);
    });
});
