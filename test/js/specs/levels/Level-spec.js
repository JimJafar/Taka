describe('Taka.levels.Level', function() {
    "use strict";

    var level;

    beforeEach(function() {
        level = new Taka.levels.Level([]);
    });

    it('should execute triggers on the right frames', function() {
        var trigr = new Taka.levels.Trigger(42, function() { });

        spyOn(trigr, 'action');

        level.triggers.push(trigr);
        level.nextTrigger = level.triggers[0];

        level.update(41);
        expect(trigr.action).not.toHaveBeenCalled();

        level.update(42);
        expect(trigr.action).toHaveBeenCalled();
    });

    it('should move on to the next trigger each time one is called', function() {
        var trigr1 = new Taka.levels.Trigger(42, function() { var a = 42; });

        var trigr2 = new Taka.levels.Trigger(69, function() { });

        spyOn(trigr1, 'action');
        spyOn(trigr2, 'action');

        level.triggers.push(trigr1, trigr2);
        level.nextTrigger = level.triggers[0];

        expect(level.nextTrigger.frame).toBe(42);

        level.update(42);
        expect(trigr1.action).toHaveBeenCalled();
        expect(level.nextTrigger.frame).toBe(69);

        level.update(69);
        expect(trigr2.action).toHaveBeenCalled();
    });
});
