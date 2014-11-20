describe('Taka.core.Engine', function() {
    "use strict";

    var engine = Taka.core.Engine;

    describe('Pause methods', function() {
        beforeEach(function() {
            spyOn(Taka.core.Timer, 'stop').and.callFake(function() { return null; });
            spyOn(Taka.core.Timer, 'start').and.callFake(function(canvas) { return canvas; });
        });

        it('should toggle the pause state', function() {
            engine.Pause();
            expect(Taka.core.Timer.start).toHaveBeenCalled();

            engine.Pause();
            expect(Taka.core.Timer.stop).toHaveBeenCalled();
        });

        it('should return the pause state', function() {
            expect(engine.isPaused()).toBe(true);
            engine.Pause();
            expect(engine.isPaused()).toBe(false);
        });
    });

    describe('private methods', function() {
        var level;
        var effect;
        var effects;
        var formation;
        var enemy1;
        var enemy2;
        var enemies;
        var pBullet;
        var pBullets;
        var eBullet;
        var eBullets;
        var player;
        var fired;

        beforeEach(function() {
            var pBulletNum = 0;
            var eBulletNum = 0;

            function getBullet() {
                return {
                    updateVelocity : function() { return null; },
                    x : 4,
                    y : 5,
                    velX : 5,
                    velY : 5,
                    width : 1,
                    height : 1,
                    damage : 1
                };
            }

            function getPlayerBullet() {
                var bullet = getBullet();
                pBulletNum++;
                bullet.name = 'pBullet' + pBulletNum;
                return bullet;
            }

            function getEnemyBullet() {
                var bullet = getBullet();
                eBulletNum++;
                bullet.name = 'eBullet' + eBulletNum;
                return bullet;
            }

            engine.setGameDimensions(500, 500);

            fired = new Date().getTime() - 10;
            player = {
                update : function() { return null; },
                x : 1,
                y : 2,
                width : 10,
                height : 10,
                velX : 5,
                velY : 5,
                fire : true,
                firedLast : fired,
                fireFreq : 5,
                getBullet : getPlayerBullet,
                hit : function(bullet) { return bullet; },
                dead : function() { return false; },
                name : 'player'
            };
            engine.Player(player);

            eBullets = engine.EnemyBullets();
            eBullets.length = 0;
            eBullet = getEnemyBullet();
            eBullets.push(eBullet);

            pBullets = engine.PlayerBullets();
            pBullets.length = 0;
            pBullet = getPlayerBullet();
            pBullet.x = 500;
            pBullets.push(pBullet);

            enemies = engine.Enemies();
            enemy1 = {
                update : function() { return null; },
                x : 8,
                y : 9,
                width : 10,
                height : 10,
                velX : 5,
                velY : 5,
                firedLast : fired,
                fire : true,
                getBullet : getEnemyBullet,
                hit : function(bullet) { return bullet; },
                dead : function() { return false; },
                name : 'enemy1'
            };
            enemy2 = {
                update : function() { return null; },
                x : 8,
                y : 500,
                width : 10,
                height : 10,
                velX : 5,
                velY : 5,
                firedLast : fired,
                fire : false,
                getBullet : getEnemyBullet,
                hit : function(bullet) { return bullet; },
                dead : function() { return false; },
                name : 'enemy2'
            };
            enemies.push(enemy1, enemy2);

            formation = {
                update : function(frame) { return frame; }
            };
            engine.addFormation(formation);

            effects = engine.Effects();
            effect = {
                finished : true
            };
            effects.push(effect);

            level = {
                update : function() { return null; }
            };
            engine.Level(level);
        });

        it('should update the player', function() {
            spyOn(player, 'update');
            spyOn(player, 'getBullet').and.callThrough();
            engine.Update(42);

            expect(player.update).toHaveBeenCalled();
            expect(player.x).toBe(6);
            expect(player.y).toBe(7);
            expect(player.getBullet).toHaveBeenCalled();
            expect(player.firedLast > fired).toBe(true);
        });

        it('should update the bullets', function() {
            spyOn(eBullet, 'updateVelocity');
            spyOn(pBullet, 'updateVelocity');
            spyOn(pBullets, 'splice');
            engine.Update(42);

            expect(eBullet.updateVelocity).toHaveBeenCalled();
            expect(pBullet.updateVelocity).toHaveBeenCalled();

            expect(eBullet.x).toBe(9);
            expect(eBullet.y).toBe(10);

            expect(pBullet.x).toBe(505);
            expect(pBullet.y).toBe(10);
            expect(pBullets.splice).toHaveBeenCalled(); // went off screen
        });

        it('should update the enemies', function() {
            spyOn(enemy1, 'update');
            spyOn(enemy2, 'update');
            spyOn(enemy1, 'getBullet');
            spyOn(eBullets, 'push');
            spyOn(enemies, 'splice');
            engine.Update(42);

            expect(enemy1.update).toHaveBeenCalled();
            expect(enemy2.update).toHaveBeenCalled();

            expect(enemy1.x).toBe(13);
            expect(enemy1.y).toBe(14);

            expect(enemy1.getBullet).toHaveBeenCalled();
            expect(eBullets.push).toHaveBeenCalled(); // fired

            expect(enemy2.x).toBe(13);
            expect(enemy2.y).toBe(505);
            expect(enemies.splice).toHaveBeenCalledWith(1, 1); // gone off screen
        });

        it('should update the formations', function() {
            spyOn(formation, 'update');
            engine.Update(42);
            expect(formation.update).toHaveBeenCalled();
        });

        it('should update the effects', function() {
            spyOn(effects, 'splice');
            engine.Update(42);
            expect(effects.splice).toHaveBeenCalled();
        });

        it('should update the collisions', function() {
            spyOn(Taka.utils.BoxUtil, 'Intersect').and.callThrough();
            spyOn(player, 'hit');
            spyOn(player, 'dead');
            spyOn(enemy1, 'hit');
            spyOn(enemy1, 'dead');

            pBullet.x = pBullet.y = enemy1.x = enemy1.y = 8;
            eBullet.x = eBullet.y = player.x = player.y = 42;
            pBullet.velX = pBullet.velY = eBullet.velX = eBullet.velY = 0;
            player.velX = player.velY = enemy1.velX = enemy1.velY = 0;

            engine.Update(42);

            // it should test for and detect collisions between enemies and player bullets
            expect(Taka.utils.BoxUtil.Intersect.calls.argsFor(0)[0].name).toBe('enemy1');
            expect(Taka.utils.BoxUtil.Intersect.calls.argsFor(0)[1].name.substr(0, 7)).toBe('pBullet');
            expect(enemy1.hit).toHaveBeenCalled();
            expect(enemy1.dead).toHaveBeenCalled();

            // it should test for and detect collisions between the player and enemy bullets
            expect(Taka.utils.BoxUtil.Intersect.calls.argsFor(2)[0].name).toBe('player');
            expect(Taka.utils.BoxUtil.Intersect.calls.argsFor(2)[1].name.substr(0, 7)).toBe('eBullet');
            expect(player.hit).toHaveBeenCalled();
            expect(player.dead).toHaveBeenCalled();
        });

        it('should update the level', function() {
            spyOn(level, 'update');
            engine.Update(42);
            expect(level.update).toHaveBeenCalled();
        });

        afterEach(function() {
            enemies.length = 0;
            eBullets.length = 0;
            pBullets.length = 0;
        });
    });
});
