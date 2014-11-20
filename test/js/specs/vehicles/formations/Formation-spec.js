describe('Taka.levels.Level', function() {
    "use strict";

    var formation;

    beforeEach(function() {
        formation = new Taka.vehicles.formations.Formation('player', 0, 21, 42);
    });

    describe('constructor', function() {
        it('should initialise the object correctly', function() {
            expect(formation.shipType).toBe('player');
            expect(formation.startFrame).toBe(0);
            expect(formation.x).toBe(21);
            expect(formation.y).toBe(42);
        });
    });

    describe('prototype', function() {
        it('should have an update method', function() {
            expect(typeof Taka.vehicles.formations.Formation.prototype.update).toBe('function');
        });
    });
});