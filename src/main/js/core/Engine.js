var Taka = (Taka) ? Taka : {};

/**
 * @name Engine
 * @class Engine The game engine (singleton)
 * @author Jim Sangwine
 */
Taka.core.Engine = (function() {
    "use strict";
    /**
     * @name _screenWidth
     * @field _screenWidth The width of the game screen (canvas) in pixels
     */
    var _screenWidth = 0;

    /**
     * @name _screenHeight
     * @field _screenHeight The height of the game screen (canvas) in pixels
     */
    var _screenHeight = 0;

    /**
     * @name _level
     * @function _level The level
     * @private
     */
    var _level = null;

    /**
     * @name _player
     * @function _player The player's ship
     * @private
     */
    var _player = null;

    /**
     * @name _enemies
     * @function _enemies A collection of all the onscreen enemy ships
     * @private
     */
    var _enemies = [];

    /**
     * @name _formations
     * @function _formations A collection of all the onscreen enemy ships
     * @private
     */
    var _formations = [];

        /**
     * @name _eBullets
     * @function _eBullets A collection of all the onscreen enemy bullets
     * @private
     */
    var _eBullets = [];

    /**
     * @name _pBullets
     * @function _pBullets A collection of all the onscreen player bullets
     * @private
     */
    var _pBullets = [];

    /**
     * @name _effects
     * @function _effects A collection of all the onscreen effects
     * @private
     */
    var _effects = [];

    /**
     * @name _lastFPSUpdate
     * @function _lastFPSUpdate Date object representing the last time the FPS was updated (happens approx once per second)
     * @private
     */
    var _lastFPSUpdate = new Date();

    /**
     * @name _framesAtLastFPSUpdate
     * @function _framesAtLastFPSUpdate The frame count the last time the FPS was updated
     * @private
     */
    var _framesAtLastFPSUpdate = 0;

    /**
     * @name _fps
     * @function _fps The current calculated FPS
     * @private
     */
    var _fps = 0;

    /**
     * @name _paused
     * @function _paused A flag indicating whether the engine is paused
     * @private
     */
    var _paused = false;

    /**
     * @name _updatePlayer
     * @function _updatePlayer Updates the player ship's position and state
     * @private
     */
    var _updatePlayer = function() {
        if (!_player) {
            return;
        }

        // movement
        _player.update();

        var newX = _player.x + _player.velX;
        var newY = _player.y + _player.velY;

        if (newX <= _screenWidth - _player.width && newX >= 0) {
            _player.x = newX;
        }

        if (newY <= _screenHeight - _player.height && newY >= 0) {
            _player.y = newY;
        }

        // firing
        var now = new Date().getTime();
        if (_player.fire && now - _player.firedLast > _player.fireFreq) {
            _pBullets.push(_player.getBullet());
            _player.firedLast = now;
        }
    };

    /**
     * @name _updateBullets
     * @function _updateBullets Updates all the on-screen bullets
     * @private
     */
    var _updateBullets = function() {
        var bullet;
        var newX;
        var newY;
        var i;

        for (i = _pBullets.length -1; i >= 0; i--) {
            bullet = _pBullets[i];

            bullet.updateVelocity();

            bullet.x += bullet.velX;
            bullet.y += bullet.velY;

            // remove bullet if it's gone off-screen
            if(bullet.x > _screenWidth || bullet.x < -bullet.width || bullet.y > _screenHeight || bullet.y < -bullet.height) {
                _pBullets.splice(i, 1);
                continue;
            }
        }
        for (i = _eBullets.length -1; i >= 0; i--) {
            bullet = _eBullets[i];

            bullet.updateVelocity();

            bullet.x += bullet.velX;
            bullet.y += bullet.velY;

            // remove bullet if it's gone off-screen
            if(bullet.x > _screenWidth || bullet.x < -bullet.width || bullet.y > _screenHeight || bullet.y < -bullet.height) {
                _eBullets.splice(i, 1);
                continue;
            }
        }
        bullet = null;
    };

    /**
     * @name _updateEnemies
     * @function _updateEnemies Updates all the on-screen enemies
     * @private
     */
    var _updateEnemies = function() {
        var enemy;
        for (var i = _enemies.length -1; i >= 0; i--) {
            enemy = _enemies[i];

            enemy.update();

            enemy.x += enemy.velX;
            enemy.y += enemy.velY;

            // remove enemy if it's gone off-screen
            // if(enemy.x < -enemy.width || enemy.x > _screenWidth || enemy.y > _screenHeight || enemy.y < -enemy.height) {
            if (enemy.y > _screenHeight) {
                _enemies.splice(i, 1);
                continue;
            }

            // firing
            if (enemy.fire) {
                _eBullets.push(enemy.getBullet());
                enemy.firedLast = new Date().getTime();
                enemy.fire = false;
            }
        }
        enemy = null;
    };

    var _updateFormations = function(frame) {
        var formation;
        for (var i = _formations.length -1; i >= 0; i--) {
            formation = _formations[i];

            formation.update(frame);
        }
        formation = null;
    };

    var _updateEffects = function(){
        var effect;
        for (var i = _effects.length -1; i >= 0; i--) {
            effect = _effects[i];
            if (effect.finished) {
                _effects.splice(i, 1);
            }
        }
    };

    var _doCollisions = function() {
        var i;
        var ii;
        var enemy;
        var bullet;
        var center;

        // between enemies and player bullets
        for (i = _enemies.length -1; i >= 0; i--) {
            enemy = _enemies[i];
            for (ii = _pBullets.length -1; ii >= 0; ii--) {
                bullet = _pBullets[ii];
                if (Taka.utils.BoxUtil.Intersect(enemy, bullet)) {
                    enemy.hit(bullet.damage);
                    _pBullets.splice(ii, 1);
                    if (enemy.dead()) {
                        _enemies.splice(i, 1);
                        center = Taka.utils.BoxUtil.Center(enemy);
                        _effects.push(new Taka.effects.Explosion(center.x, center.y));
                    }
                }
            }
        }

        // between enemy bullets and the player
        for (i = _eBullets.length -1; i>= 0; i--) {
            bullet = _eBullets[i];
            if (Taka.utils.BoxUtil.Intersect(_player, bullet)) {
                _player.hit(bullet.damage);
                _eBullets.splice(i, 1);
                center = Taka.utils.BoxUtil.Center(_player);
                _effects.push(new Taka.effects.Explosion(center.x, center.y));
                if(_player.dead()) {
                    Taka.gameOver();
                }
            }
        }
    };

    /**
     * @name _updateLevel
     * @function _updateLevel Updates the level (executes frame triggers) - called every frame
     * @param frame The current frame number
     * @private
     */
    var _updateLevel = function(frame) {
        _level.update(frame);
    };

    /**
     * @name _updateStats
     * @function _updateStats Updates the game stats (FPS etc.) - called every frame
     * @param frame The current frame number
     * @private
     */
    var _updateStats = function(frame) {
        var now = new Date();
        var sinceLastUpdate = now.getTime() - _lastFPSUpdate.getTime();
        if (sinceLastUpdate > 1000) {
            _fps = (frame - _framesAtLastFPSUpdate) * (sinceLastUpdate / 1000);
            _fps = Math.round(_fps * 100) / 100;
            _framesAtLastFPSUpdate = frame;
            _lastFPSUpdate = now;
        }
    };

    return {
        /**
         * @name Update
         * @function Update Updates the game state - called every frame
         * @param frame The current frame number
         * @public
         */
        Update: function(frame) {
            _updateLevel(frame);
            _updatePlayer();
            _updateBullets();
            _updateEnemies(frame);
            _updateFormations(frame);
            _doCollisions();
            _updateEffects();
            _updateStats(frame);
        },

        /**
         * @name setGameDimensions
         * @function setGameDimensions Sets the screen (canvas) height and width
         * @param width The width of the screen (canvas) in pixels
         * @param height The height of the screen (canvas) in pixels
         * @public
         */
        setGameDimensions: function(width, height){
            _screenWidth = width;
            _screenHeight = height;
        },

        /**
         * @name Level
         * @function Level Gets or sets the level
         * @param level Optional instance of Taka.levels.Level
         * @public
         */
        Level: function(level) {
            if (level) {
                _level = level;
            }
            return _level;
        },

        /**
         * @name Player
         * @function Player Gets or sets the player's ship
         * @param ship Optional instance of Taka.vehicles.Ship
         * @public
         */
        Player: function(ship) {
            if (ship) {
                _player = ship;
            }
            return _player;
        },

        /**
         * @name PlayerBullets
         * @function PlayerBullets Gets the collection of bullets fired by the player
         * @public
         */
        PlayerBullets: function() {
            return _pBullets;
        },

        /**
         * @name EnemyBullets
         * @function EnemyBullets Gets the collection of bullets fired by enemies
         * @public
         */
        EnemyBullets: function() {
            return _eBullets;
        },

        /**
         * @name Enemies
         * @function Enemies Gets the collection of enemies
         * @public
         */
        Enemies: function() {
            return _enemies;
        },

        /**
         * @name Effects
         * @function Effects Gets the collection of effects
         * @public
         */
        Effects: function() {
            return _effects;
        },

        /**
         * @name addEnemy
         * @function addEnemy Adds a single enemy to the game - enemies are added just off-screen
         * @private
         */
        addEnemy: function(enemy) {
            _enemies.push(enemy);
        },

        /**
         * @name addFormation
         * @function addFormation Adds a formation of enemies to the game - enemies are added just off-screen
         * @private
         */
        addFormation: function(formation) {
            _formations.push(formation);
        },

        FPS: function() {
            return _fps;
        },

        /**
         * @name Pause
         * @function Pause Toggles pause state
         * @public
         */
        Pause: function() {
            _paused = !_paused;
            if (_paused) {
                Taka.core.Timer.stop();
            } else {
                Taka.core.Timer.start(Taka.core.Renderer.getCanvas());
            }
        },

        /**
         * @name isPaused
         * @function isPaused Returns true if paused else false
         * @public
         */
        isPaused: function() {
            return _paused;
        }
    };
})();