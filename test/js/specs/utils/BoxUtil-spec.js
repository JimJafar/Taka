describe('Taka.utils.BoxUtil', function() {
    "use strict";

    var box;
    var boxutil = Taka.utils.BoxUtil;

    beforeEach(function() {
        box = {
            x : 2,
            y : 2,
            width : 3,
            height : 6
        };
    });

    it('should calculate and return Top', function() {
        expect(boxutil.Top(box)).toBe(2);
    });

    it('should calculate and return Bottom', function() {
        expect(boxutil.Bottom(box)).toBe(8);
    });

    it('should calculate and return Left', function() {
        expect(boxutil.Left(box)).toBe(2);
    });

    it('should calculate and return Right', function() {
        expect(boxutil.Right(box)).toBe(5);
    });

    it('should calculate and return Center', function() {
        var center = boxutil.Center(box);
        expect(center.x).toBe(3.5);
        expect(center.y).toBe(5);
    });

    it('should calculate and return TopLeft', function() {
        var tl = boxutil.TopLeft(box);
        expect(tl.x).toBe(2);
        expect(tl.y).toBe(2);
    });

    it('should calculate and return TopRight', function() {
        var tl = boxutil.TopRight(box);
        expect(tl.x).toBe(5);
        expect(tl.y).toBe(2);
    });

    it('should calculate and return BottomLeft', function() {
        var tl = boxutil.BottomLeft(box);
        expect(tl.x).toBe(2);
        expect(tl.y).toBe(8);
    });

    it('should calculate and return BottomRight', function() {
        var tl = boxutil.BottomRight(box);
        expect(tl.x).toBe(5);
        expect(tl.y).toBe(8);
    });

    it('should detect intersections', function() {
        var box2 = {
            x : 6,
            y : 2,
            width : 3,
            height : 6
        };
        expect(boxutil.Intersect(box, box2)).toBe(false);
        box2.x = 4;
        expect(boxutil.Intersect(box, box2)).toBe(true);
        box2.y = 9;
        expect(boxutil.Intersect(box, box2)).toBe(false);
    });
});