var Taka = (Taka) ? Taka : {};

describe('Taka.core.Renderer', function() {
    "use strict";
    var renderer = Taka.core.Renderer;
    var canvas;
    var context;

    beforeEach(function() {
        canvas = {
            width : 0,
            getContext : function() { return this.context; }
        };
        context = {
            drawImage : function() {
                var theMeaning = 42;
            },
            clearRect : function() {
                var drink = "Pan Galactic Gargle Blaster";
            },
            fillRect : function() {
                var dont = "PANIC!";
            }
        };
        canvas.context = context;
        renderer.setCanvas(canvas);
        Taka.core.Engine.Player(new Taka.vehicles.Player());
    });

    it('should get and set the canvas', function() {
        canvas.width = 42;
        expect(renderer.getCanvas().width).toBe(42);
    });

    describe('Render', function() {

        beforeEach(function() {
            spyOn(context, 'drawImage');
        });

        it('should clear the canvas', function() {
            spyOn(context, 'clearRect');
            renderer.Render(42);

            expect(context.clearRect).toHaveBeenCalled();
        });
        it('should draw the player', function() {
            var player = Taka.core.Engine.Player();
            player.sprite = 'theSprite';
            player.x = 42;
            player.y = 42;

            renderer.Render(42);
            expect(context.drawImage).toHaveBeenCalledWith('theSprite', 42, 42);
        });

        it('should draw the enemies', function() {
            var enemy1 = new Taka.vehicles.Drone(42, 42, 0, 0);
            var enemy2 = new Taka.vehicles.Drone(42, 42, 0, 0);
            var enemy3 = new Taka.vehicles.Drone(42, 42, 0, 0);

            enemy1.sprite = 'enemy1';
            enemy2.sprite = 'enemy2';
            enemy3.sprite = 'enemy3';

            Taka.core.Engine.addEnemy(enemy1);
            Taka.core.Engine.addEnemy(enemy2);
            Taka.core.Engine.addEnemy(enemy3);

            renderer.Render(42);
            expect(context.drawImage).toHaveBeenCalledWith('enemy1', 42, 42);
            expect(context.drawImage).toHaveBeenCalledWith('enemy2', 42, 42);
            expect(context.drawImage).toHaveBeenCalledWith('enemy3', 42, 42);
        });


        it('should draw the player bullets', function() {
            var bullet1 = new Taka.ordnance.PlayerBullet(42, 42);
            var bullet2 = new Taka.ordnance.PlayerBullet(42, 42);
            var bullet3 = new Taka.ordnance.PlayerBullet(42, 42);

            bullet1.sprite = 'pBullet1';
            bullet2.sprite = 'pBullet2';
            bullet3.sprite = 'pBullet3';

            Taka.core.Engine.PlayerBullets().push(bullet1);
            Taka.core.Engine.PlayerBullets().push(bullet2);
            Taka.core.Engine.PlayerBullets().push(bullet3);

            renderer.Render(42);
            expect(context.drawImage).toHaveBeenCalledWith('pBullet1', 33, 42);
            expect(context.drawImage).toHaveBeenCalledWith('pBullet2', 33, 42);
            expect(context.drawImage).toHaveBeenCalledWith('pBullet3', 33, 42);
        });

        it('should draw the enemy bullets', function() {
            Taka.core.Engine.EnemyBullets().push(new Taka.ordnance.Bullet('eBullet1', 42, 42, 42, 42));
            Taka.core.Engine.EnemyBullets().push(new Taka.ordnance.Bullet('eBullet2', 42, 42, 42, 42));
            Taka.core.Engine.EnemyBullets().push(new Taka.ordnance.Bullet('eBullet3', 42, 42, 42, 42));

            renderer.Render(42);
            expect(context.drawImage).toHaveBeenCalledWith('eBullet1', 42, 42);
            expect(context.drawImage).toHaveBeenCalledWith('eBullet2', 42, 42);
            expect(context.drawImage).toHaveBeenCalledWith('eBullet3', 42, 42);
        });

        it('should draw the effects', function() {
            Taka.core.Engine.Effects().push(new Taka.effects.Effect(['effect1'], 0, 0, 42, 42, 0, 0));
            Taka.core.Engine.Effects().push(new Taka.effects.Effect(['effect2'], 0, 0, 42, 42, 0, 0));
            Taka.core.Engine.Effects().push(new Taka.effects.Effect(['effect3'], 0, 0, 42, 42, 0, 0));

            renderer.Render(42);
            expect(context.drawImage).toHaveBeenCalledWith('effect1', 42, 42);
            expect(context.drawImage).toHaveBeenCalledWith('effect2', 42, 42);
            expect(context.drawImage).toHaveBeenCalledWith('effect3', 42, 42);
        });
    });
});