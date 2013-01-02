var Taka = (Taka) ? Taka : {};

/**
 * The game engine
 * @class
 */
Taka.core.Engine = (function() {
    "use strict";
    /**
     * The width of the game screen (canvas) in pixels
     * @memberof Taka.core.Engine
     * @type Number
     * @private
     */
    var _screenWidth = 0;

    /**
     * The height of the game screen (canvas) in pixels
     * @memberof Taka.core.Engine
     * @type Number
     * @private
     */
    var _screenHeight = 0;

    /**
     * The level
     * @memberof Taka.core.Engine
     * @type Taka.levels.Level
     * @private
     */
    var _level = null;

    /**
     * The player's ship
     * @memberof Taka.core.Engine
     * @type Taka.vehicles.PlayerVehicle
     * @private
     */
    var _player = null;

    /**
     * A collection of all the onscreen enemy ships
     * @memberof Taka.core.Engine
     * @type Array
     * @private
     */
    var _enemies = [];

    /**
     * A collection of all the onscreen enemy ships
     * @memberof Taka.core.Engine
     * @type Array
     * @private
     */
    var _formations = [];

    /**
     * A collection of all the onscreen enemy bullets
     * @memberof Taka.core.Engine
     * @type Array
     * @private
     */
    var _eBullets = [];

    /**
     * A collection of all the onscreen player bullets
     * @memberof Taka.core.Engine
     * @type Array
     * @private
     */
    var _pBullets = [];

    /**
     * A collection of all the onscreen effects
     * @memberof Taka.core.Engine
     * @type Array
     * @private
     */
    var _effects = [];

    /**
     * The last time the FPS was updated (happens approx once per second)
     * @memberof Taka.core.Engine
     * @type Date
     * @private
     */
    var _lastFPSUpdate = new Date();

    /**
     * The frame count the last time the FPS was updated
     * @memberof Taka.core.Engine
     * @type Number
     * @private
     */
    var _framesAtLastFPSUpdate = 0;

    /**
     * The current calculated FPS
     * @memberof Taka.core.Engine
     * @type Number
     * @private
     */
    var _fps = 0;

    /**
     * A flag indicating whether the engine is paused
     * @memberof Taka.core.Engine
     * @type Boolean
     * @private
     */
    var _paused = false;

    /**
     * Updates the player ship's position and state
     * @memberof Taka.core.Engine
     * @see Taka.vehicles.PlayerVehicle.update
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
     * Updates all the on-screen bullets
     * @memberof Taka.core.Engine
     * @see Taka.ordnance.Bullet.updateVelocity
     * @private
     */
    var _updateBullets = function() {
        var bullet;
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
     * Updates all the on-screen enemies
     * @memberof Taka.core.Engine
     * @see Taka.vehicles.Vehicle.update
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

    /**
     * Updates all the on-screen Vehicle formations
     * @memberof Taka.core.Engine
     * @param {Number} frame The frame number
     * @see Taka.vehilces.formations.Formation.update
     * @private
     */
    var _updateFormations = function(frame) {
        var formation;
        for (var i = _formations.length -1; i >= 0; i--) {
            formation = _formations[i];

            formation.update(frame);
        }
        formation = null;
    };

    /**
     * Updates all the on-screen effects
     * @memberof Taka.core.Engine
     * @see Taka.effects.Effect
     * @private
     */
    var _updateEffects = function(){
        var effect;
        for (var i = _effects.length -1; i >= 0; i--) {
            effect = _effects[i];
            if (effect.finished) {
                _effects.splice(i, 1);
            }
        }
    };

    /**
     * Detects and actions collisions
     * @memberof Taka.core.Engine
     * @see Taka.utils.BoxUtil
     * @private
     */
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
                        _effects.push(new Taka.effects.ExplosionEffect(center.x, center.y));
                    }
                }
            }
        }

        // between enemy bullets and the player
        for (i = _eBullets.length -1; i>= 0; i--) {
            bullet = _eBullets[i];
            if (Taka.utils.BoxUtil.Intersect(_player, bullet)) {
                _eBullets.splice(i, 1);
                _player.hit(bullet.damage);
                center = Taka.utils.BoxUtil.Center(_player);
                _effects.push(new Taka.effects.ExplosionEffect(center.x, center.y));
                if(_player.dead()) {
                    Taka.gameOver();
                }
            }
        }
    };

    /**
     * Updates the level (executes frame triggers) - called every frame
     * @memberof Taka.core.Engine
     * @param {Number} frame The current frame number
     * @see Taka.levels.Level.update
     * @private
     */
    var _updateLevel = function(frame) {
        _level.update(frame);
    };

    /**
     * Updates the game stats (FPS etc.) - called every frame
     * @param {Number} frame The current frame number
     * @memberof Taka.core.Engine
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

    var _timePaused = null;

    /**
     * @lends Taka.core.Engine
     */
    return {
        /**
         * Updates the game state - called every frame
         * @param {Number} frame The current frame number
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
         * Sets the screen (canvas) height and width
         * @param {Number} width The width of the screen (canvas) in pixels
         * @param {Number} height The height of the screen (canvas) in pixels
         */
        setGameDimensions: function(width, height){
            _screenWidth = width;
            _screenHeight = height;
        },

        /**
         * Gets or sets the level
         * @param {Taka.levels.Level} [level] The level if setting
         * @returns {Taka.levels.Level}
         */
        Level: function(level) {
            if (level) {
                _level = level;
            }
            return _level;
        },

        /**
         * Gets or sets the player's ship
         * @param {Taka.vehicles.PlayerVehicle} [player] The player's vehicle
         * @returns {Taka.vehicles.PlayerVehicle}
         */
        Player: function(player) {
            if (player) {
                _player = player;
            }
            return _player;
        },

        /**
         * Gets the collection of bullets fired by the player
         * @returns {Array}
         */
        PlayerBullets: function() {
            return _pBullets;
        },

        /**
         * Gets the collection of bullets fired by enemies
         * @returns {Array}
         */
        EnemyBullets: function() {
            return _eBullets;
        },

        /**
         * Gets the collection of enemies
         * @returns {Array}
         */
        Enemies: function() {
            return _enemies;
        },

        /**
         * Gets the collection of effects
         * @returns {Array}
         */
        Effects: function() {
            return _effects;
        },

        /**
         * Adds a single enemy to the game - enemies are added just off-screen
         * @param {Taka.vehicles.Vehicle} enemy The enemy to be added
         */
        addEnemy: function(enemy) {
            _enemies.push(enemy);
        },

        /**
         * Adds a formation of enemies to the game - enemies are added just off-screen
         * @param {Taka.vehicles.formations.Formation} formation The formation to be added
         */
        addFormation: function(formation) {
            _formations.push(formation);
        },

        /**
         * Gets the target Frames Per Second
         * @returns {Number}
         */
        FPS: function() {
            return _fps;
        },

        /**
         * Toggles pause state
         * @see Taka.core.Timer
         */
        Pause: function() {
            _paused = !_paused;
            if (_paused) {
                _timePaused = new Date().getTime();
                Taka.core.Timer.stop();
            } else {
                Taka.core.Timer.start(Taka.core.Renderer.getCanvas());
            }
        },

        /**
         * Returns a boolean indication of whether the engine is paused or not
         * @returns {Boolean}
         */
        isPaused: function() {
            return _paused;
        }
    };
})();