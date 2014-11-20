describe('Taka.ordnance.Bullet', function() {
    "use strict";

    var bullet;

    beforeEach(function() {
        bullet = new Taka.ordnance.Bullet( { n : 'bullet' }, 2, 2, 0, 0, 5, 1 );
    });

    describe('constructor', function() {
        it('should initialise the object correctly', function() {
            expect(bullet.sprite.n).toBe('bullet');
            expect(bullet.width).toBe(2);
            expect(bullet.height).toBe(2);
            expect(bullet.x).toBe(0);
            expect(bullet.y).toBe(0);
            expect(bullet.speed).toBe(5);
            expect(bullet.damage).toBe(1);
            expect(bullet.moveUp).toBe(false);
            expect(bullet.moveDown).toBe(false);
            expect(bullet.moveLeft).toBe(false);
            expect(bullet.moveRight).toBe(false);
            expect(bullet.velX).toBe(0);
            expect(bullet.velY).toBe(0);
        });
    });

    it('should update the velocity', function() {
        bullet.moveUp = true;
        bullet.updateVelocity();
        expect(bullet.velY).toBe(-5);

        bullet.moveUp = false;
        bullet.moveDown = true;
        bullet.updateVelocity();
        expect(bullet.velY).toBe(5);

        bullet.moveLeft = true;
        bullet.updateVelocity();
        expect(bullet.velX).toBe(-5);

        bullet.moveLeft = false;
        bullet.moveRight = true;
        bullet.updateVelocity();
        expect(bullet.velX).toBe(5);
    });

    it('should return the velocity', function() {
        bullet.moveDown = true;
        bullet.moveLeft = true;
        bullet.updateVelocity();
        var velocity = bullet.getVelocity();
        expect(velocity.x).toBe(-5);
        expect(velocity.y).toBe(5);
    });

    it('should set the position', function() {
        expect(bullet.x).toBe(0);
        expect(bullet.y).toBe(0);
        bullet.setPos(4, 2);
        expect(bullet.x).toBe(4);
        expect(bullet.y).toBe(2);
    });

    it('should return the position', function() {
        bullet.setPos(6, 9);
        var pos = bullet.getPos();
        expect(pos.x).toBe(6);
        expect(pos.y).toBe(9);
    });

    it('should return the sprite', function() {
        expect(bullet.getSprite().n).toBe('bullet');
    });
});