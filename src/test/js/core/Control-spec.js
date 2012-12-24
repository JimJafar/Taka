var Taka = (Taka) ? Taka : {};

describe('Taka.core.Control', function() {
    "use strict";
    var control = Taka.core.Control;
    var player;
    var buttons = Taka.core.Config.buttons;

    beforeEach(function() {
        player = { moveUp : null, moveDown : null, moveLeft : null, moveRight : null, fire : null };
        Taka.core.Engine.Player(player);
        window.event = undefined;
    });

    it('should allow moving up', function() {
        control.keyDown( { which : buttons.up } );
        expect(player.moveUp).toBe(true);
    });

    it('should allow moving down', function() {
        control.keyDown( { which : buttons.down } );
        expect(player.moveDown).toBe(true);
    });

    it('should allow moving left', function() {
        control.keyDown( { which : buttons.left } );
        expect(player.moveLeft).toBe(true);
    });

    it('should allow moving right', function() {
        control.keyDown( { which : buttons.right } );
        expect(player.moveRight).toBe(true);
    });

    it('should allow firing', function() {
        control.keyDown( { which : buttons.fire } );
        expect(player.fire).toBe(true);
    });

    it('should allow pausing', function() {
        control.keyDown( { which : buttons.pause } );
        expect(Taka.core.Engine.isPaused()).toBe(true);
    });

    it('should cancel movement on keyUp', function() {
        Taka.core.Engine.Player().moveUp = true;
        Taka.core.Engine.Player().moveDown = true;
        Taka.core.Engine.Player().moveLeft = true;
        Taka.core.Engine.Player().moveRight = true;

        control.keyUp( { which : Taka.core.Config.buttons.up } );
        expect(Taka.core.Engine.Player().moveUp).toBe(false);

        control.keyUp( { which : Taka.core.Config.buttons.down } );
        expect(Taka.core.Engine.Player().moveDown).toBe(false);

        control.keyUp( { which : Taka.core.Config.buttons.left } );
        expect(Taka.core.Engine.Player().moveLeft).toBe(false);

        control.keyUp( { which : Taka.core.Config.buttons.right } );
        expect(Taka.core.Engine.Player().moveRight).toBe(false);
    });
});
