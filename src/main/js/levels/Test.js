var Taka = (Taka) ? Taka : {};

(function(Taka) {
	var Test = function() {
		this.setTriggers();
		this.Super();
	};
	Taka.extend(Test, Taka.levels.Level);

	Test.prototype.setTriggers = function() {
		this.triggers = [
			{ frame: 100,
			  execute: function() {
				  Taka.core.Engine.addFormation(new Taka.vehicles.formations.V5(Taka.vehicles.Drone, 100, 100, 0));
			  }
			},
			{ frame: 300,
			  execute: function() { Taka.core.Engine.addEnemy(new Taka.vehicles.Drone(150, 0, 1, 2)); }
			},
			{ frame: 350,
			  execute: function() {
				  Taka.core.Engine.addFormation(new Taka.vehicles.formations.A5(Taka.vehicles.Drone, 350, 300, 0));
			  }
			}
		];
	};

	Taka.levels.Test = Test;
})(Taka);