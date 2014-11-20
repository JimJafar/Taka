(function() {

    "use strict";

    var triggers = [
        new Taka.levels.Trigger(100, function() {
            Taka.core.Engine.addFormation(new Taka.vehicles.formations.V5Formation(Taka.vehicles.DroneVehicle, 100, 100, 0));
        }),
        new Taka.levels.Trigger(300, function() {
            Taka.core.Engine.addEnemy(new Taka.vehicles.DroneVehicle(150, 0, 1, 2));
        }),
        new Taka.levels.Trigger(350, function() {
            Taka.core.Engine.addFormation(new Taka.vehicles.formations.A5Formation(Taka.vehicles.DroneVehicle, 350, 300, 0));
        })
    ];

    /**
     * A basic test level
     * @augments Taka.levels.Level
     * @constructor
     */
    Taka.levels.TestLevel = new Taka.levels.Level(triggers);

})();