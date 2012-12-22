var Taka = (Taka) ? Taka : {};

describe('Taka.core.Config', function() {
    "use strict";
    var config = Taka.core.Config;

    it('should define fps', function() {
        expect(config.hasOwnProperty('fps')).toBe(true);
        expect(typeof config.fps).toBe('number');
    });

    it('should define buttons', function() {
        expect(config.hasOwnProperty('buttons')).toBe(true);
        expect(typeof config.fps).toBe('number');
    });

    it('should define the up key', function() {
        expect(config.buttons.hasOwnProperty('up')).toBe(true);
        expect(typeof config.buttons.up).toBe('number');
    });

    it('should define the down key', function() {
        expect(config.buttons.hasOwnProperty('down')).toBe(true);
        expect(typeof config.buttons.down).toBe('number');
    });

    it('should define the left key', function() {
        expect(config.buttons.hasOwnProperty('left')).toBe(true);
        expect(typeof config.buttons.left).toBe('number');
    });

    it('should define the right key', function() {
        expect(config.buttons.hasOwnProperty('right')).toBe(true);
        expect(typeof config.buttons.right).toBe('number');
    });

    it('should define the fire key', function() {
        expect(config.buttons.hasOwnProperty('fire')).toBe(true);
        expect(typeof config.buttons.fire).toBe('number');
    });

    it('should define the pause key', function() {
        expect(config.buttons.hasOwnProperty('pause')).toBe(true);
        expect(typeof config.buttons.pause).toBe('number');
    });
});
