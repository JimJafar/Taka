var Taka = (Taka) ? Taka : {};

(function() {
    "use strict";
    /**
     * A basic test level
     * @augments Taka.levels.Level
     * @constructor
     */
    Taka.levels.TestLevel = function() {
        this.setTriggers();
        this.Super();
    };
    Taka.extend(Taka.levels.TestLevel, Taka.levels.Level);

    /**
     * Sets all of the time-based (by frame number) triggers for the level
     */
    Taka.levels.TestLevel.prototype.setTriggers = function() {
        this.triggers = [
            {
                frame: 100,
                execute: function() {
                    Taka.core.Engine.addFormation(new Taka.vehicles.formations.V5Formation(Taka.vehicles.DroneVehicle, 100, 100, 0));
                }
            },
            {
                frame: 300,
                execute: function() {
                    Taka.core.Engine.addEnemy(new Taka.vehicles.DroneVehicle(150, 0, 1, 2));
                }
            },
            {
                frame: 350,
                execute: function() {
                    Taka.core.Engine.addFormation(new Taka.vehicles.formations.A5Formation(Taka.vehicles.DroneVehicle, 350, 300, 0));
                }
            }
        ];
    };
})();