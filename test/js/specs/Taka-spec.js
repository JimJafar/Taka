describe('Taka', function() {
    "use strict";

    it('should define all the required namespaces', function() {
        expect(typeof Taka).toBe('object');
        expect(Taka.hasOwnProperty('utils')).toBe(true);
        expect(Taka.hasOwnProperty('core')).toBe(true);
        expect(Taka.hasOwnProperty('assets')).toBe(true);
        expect(Taka.hasOwnProperty('levels')).toBe(true);
        expect(Taka.hasOwnProperty('ordnance')).toBe(true);
        expect(Taka.hasOwnProperty('effects')).toBe(true);
        expect(Taka.hasOwnProperty('vehicles')).toBe(true);
        expect(Taka.vehicles.hasOwnProperty('formations')).toBe(true);
    });

    it('should extend object prototypes and set their Super property', function() {
        var obj1 = {};
        obj1.prototype = { theAnswer : function() { return 42; } };
        var obj2 = {};
        obj2.prototype = {};

        Taka.extend(obj2, obj1);
        expect(obj2.prototype.theAnswer()).toBe(42);
        expect(obj2.prototype.Super).toBe(obj1);
    });

    it('should start the game engine', function() {
        spyOn(Taka.core.Timer, 'start').and.returnValue(null);
        Taka.start(1, 2);
        expect(Taka.core.Timer.start).toHaveBeenCalledWith(1, 2);
        expect(typeof document.onkeyup).toBe('function');
        expect(typeof document.onkeydown).toBe('function');
    });

    it('should stop the game engine', function() {
        spyOn(Taka.core.Timer, 'stop').and.returnValue(null);
        Taka.stop();
        expect(Taka.core.Timer.stop).toHaveBeenCalled();
        expect(document.onkeyup).toBe(null);
        expect(document.onkeydown).toBe(null);
    });
});