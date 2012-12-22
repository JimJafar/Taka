/**
 * @name Taka
 * @namespace Taka The Taka namespace
 * @author Jim Sangwine
 */
var Taka = {};

/**
 * @name Taka.utils
 * @namespace Taka.utils The Taka.utils namespace
 */
Taka.utils = {};

/**
 * @name Taka.core
 * @namespace Taka.core The Taka.core namespace
 */
Taka.core = {};

/**
 * @name Taka.assets
 * @namespace Taka.assets The Taka.assets namespace
 */
Taka.assets = {};

/**
 * @name Taka.levels
 * @namespace Taka.levels The Taka.levels namespace
 */
Taka.levels = {};

/**
 * @name Taka.ordnance
 * @namespace Taka.ordnance The Taka.ordnance namespace
 */
Taka.ordnance = {};

/**
 * @name Taka.effects
 * @namespace Taka.effects The Taka.effects namespace
 */
Taka.effects = {};

/**
 * @name Taka.ordnance.formations
 * @namespace Taka.ordnance.formations The Taka.ordnance.formations namespace
 */
Taka.ordnance.formations = {};

/**
 * @name Taka.vehicles
 * @namespace Taka.vehicles The Taka.vehicles namespace
 */
Taka.vehicles = {};

/**
 * @name Taka.vehicles.formations
 * @namespace Taka.vehicles.formations The Taka.vehicles.formations namespace
 */
Taka.vehicles.formations = {};

/**
 * @function extend Enables inheritance
 * @param {} dest The child class
 * @param {} source The parent class
 * @type void
 **/
Taka.extend=function(dest,source){
    "use strict";
    if (!dest || !source) {
        return;
    }
    for(proto in source.prototype){
        dest.prototype[proto]=source.prototype[proto];
    }
    dest.prototype.Super=source;
};

/**
 * @name start
 * @function start Starts the game engine
 * @param canvas The canvas to render to
 * @param callback An optional callback function to be invoked on every frame
 * @public
 */
Taka.start = function(canvas, callback) {
    "use strict";
    Taka.core.Timer.start(canvas, callback);
    document.onkeyup = Taka.core.Control.keyUp;
    document.onkeydown = Taka.core.Control.keyDown;
};

/**
 * @name stop
 * @function stop Stops the game engine
 * @public
 */
Taka.stop = function() {
    "use strict";
    Taka.core.Timer.stop();
    document.onkeyup = null;
    document.onkeydown = null;
};