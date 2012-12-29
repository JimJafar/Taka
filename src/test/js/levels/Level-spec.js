var Taka = (Taka) ? Taka : {};

describe('Taka.levels.Level', function() {
    "use strict";

    var level;

    beforeEach(function() {
        level = new Taka.levels.Level();
        Taka.levels.Level.prototype.triggers.length = 0;
    });

    it('should execute triggers on the right frames', function() {
        var trigr = {
            execute : function() { },
            frame : 42
        };
        spyOn(trigr, 'execute');

        level.triggers.push(trigr);
        level.nextTrigger = level.triggers[0];

        level.update(41);
        expect(trigr.execute).not.toHaveBeenCalled();

        level.update(42);
        expect(trigr.execute).toHaveBeenCalled();
    });

    it('should move on to the next trigger each time one is called', function() {
        var trigr1 = {
            execute : function() { var a = 42; },
            frame : 42
        };

        var trigr2 = {
            execute : function() { },
            frame : 69
        };

        spyOn(trigr1, 'execute');
        spyOn(trigr2, 'execute');

        level.triggers.push(trigr1, trigr2);
        level.nextTrigger = level.triggers[0];

        expect(level.nextTrigger.frame).toBe(42);

        level.update(42);
        expect(trigr1.execute).toHaveBeenCalled();
        expect(level.nextTrigger.frame).toBe(69);

        level.update(69);
        expect(trigr2.execute).toHaveBeenCalled();
    });
});
