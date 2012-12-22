describe('Taka.effects.Effect', function() {

    var effect;

    beforeEach(function() {
        effect = new Taka.effects.Effect(['f1', 'f2', 'f3'], 1, 2, 3, 4, 5, 6);
    });

    describe('constructor', function() {
        it('should initialise the object correctly', function() {
            expect(effect.sprites.length).toBe(3);
            expect(effect.width).toBe(1);
            expect(effect.height).toBe(2);
            expect(effect.x).toBe(2.5);
            expect(effect.y).toBe(3);
            expect(effect.velX).toBe(5);
            expect(effect.velY).toBe(6);
            expect(effect.finished).toBe(false);
            expect(effect.frame).toBe(-1);
        });
    });

    describe('prototype', function() {
        it('should get the velocity', function() {
            var velocity = effect.getVelocity();
            expect(velocity.x).toBe(5);
            expect(velocity.y).toBe(6);
        });

        it('should set the position', function() {
            effect.setPos(42, 21);
            expect(effect.x).toBe(42);
            expect(effect.y).toBe(21);
        });

        it('should get the position', function() {
            var pos = effect.getPos();
            expect(pos.x).toBe(2.5);
            expect(pos.y).toBe(3);
        });

        it('should get the sprite', function() {
            expect(effect.getSprite()).toBe('f1');
        });

        it('should finish when all the frames of animation have been shown', function() {
            expect(effect.getSprite()).toBe('f1');
            expect(effect.finished).toBe(false);
            expect(effect.getSprite()).toBe('f2');
            expect(effect.finished).toBe(false);
            expect(effect.getSprite()).toBe('f3');
            expect(effect.finished).toBe(true);
        });
    });
});