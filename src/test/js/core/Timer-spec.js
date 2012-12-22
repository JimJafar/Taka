describe('Taka.core.Timer', function() {
    it('should start the timer and call the callback on tick', function() {
        Taka.core.Engine.Level(new Taka.levels.Level());
        Taka.core.Engine.Enemies().length = 0;
        Taka.core.Engine.EnemyBullets().length = 0;
        Taka.core.Engine.PlayerBullets().length = 0;

        var callbackWrapper = { callback : function() { var x = 42; } };
        var canvas = document.createElement('canvas');

        spyOn(callbackWrapper, 'callback');
        Taka.core.Timer.start(canvas, callbackWrapper.callback);
        expect(callbackWrapper.callback).toHaveBeenCalled();
    });
});
