/*global document:false */

/**
 * The Taka namespace
 * @namespace
 * @global
 * @author Jim Sangwine
 */
var Taka = {};

/**
 * The utils namespace
 * @namespace
 */
Taka.utils = {};

/**
 * The core namespace
 * @namespace
 */
Taka.core = {};

/**
 * The assets namespace
 * @namespace
 * @memberof Taka
 */
Taka.assets = {};

/**
 * The levels namespace
 * @namespace
 */
Taka.levels = {};

/**
 * The ordnance namespace
 * @namespace
 */
Taka.ordnance = {};

/**
 * The effects namespace
 * @namespace
 */
Taka.effects = {};

/**
 * The vehicles namespace
 * @namespace
 */
Taka.vehicles = {};

/**
 * The formations namespace
 * @namespace
 */
Taka.vehicles.formations = {};

/**
 * Enables inheritance
 * @param {*} dest The derived class
 * @param {*} source The base class
 **/
Taka.extend = function(dest,source){
    "use strict";
    if (!dest || !source) {
        return;
    }
    /*jshint forin:false */
    for(var proto in source.prototype) {
        dest.prototype[proto] = source.prototype[proto];
    }
    dest.prototype.Super=source;
};

/**
 * Starts the game engine
 * @param canvas The canvas to render to
 * @param callback An optional callback function to be invoked on every frame
 */
Taka.start = function(canvas, callback) {
    "use strict";
    Taka.core.Timer.start(canvas, callback);
    document.onkeyup = Taka.core.Control.keyUp;
    document.onkeydown = Taka.core.Control.keyDown;
};

/**
 * Stops the game engine
 */
Taka.stop = function() {
    "use strict";
    Taka.core.Timer.stop();
    document.onkeyup = null;
    document.onkeydown = null;
};

/**
 * Called when the player dies
 */
Taka.gameOver = function() {
    "use strict";
    Taka.stop();
};