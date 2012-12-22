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
});
