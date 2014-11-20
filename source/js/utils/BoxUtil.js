/**
 * Utility object for bounding box collision detection
 * @class
 */
Taka.utils.BoxUtil = (function() {

    "use strict";

    return {
        /**
         * Finds the Y axis value of the top edge of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        Top: function (box) {
            return box.y;
        },

        /**
         * Finds the Y axis value of the bottom edge of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        Bottom: function (box) {
            return box.y + box.height;
        },

        /**
         * Finds the X axis value of the left edge of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        Left: function (box) {
            return box.x;
        },

        /**
         * Finds the X axis value of the right edge of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        Right: function (box) {
            return box.x + box.width;
        },

        /**
         * Finds the coordinates of the middle point of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        Center: function (box) {
            return {x: box.x + (box.width / 2), y: box.y + (box.height / 2)};
        },

        /**
         * Finds the coordinates of the top left corner of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        TopLeft: function (box) {
            return {x: box.x, y: box.y};
        },

        /**
         * Finds the coordinates of the top right corner of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        TopRight: function (box) {
            return {x: box.x + box.width, y: box.y};
        },

        /**
         * Finds the coordinates of the bottom left corner of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        BottomLeft: function (box) {
            return {x: box.x, y: box.y + box.height};
        },

        /**
         * Finds the coordinates of the bottom right corner of the box
         * @param {{x: Number, y: Number, height: Number, width: Number}} box
         * @return {Number}
         */
        BottomRight: function (box) {
            return {x: box.x + (box.width), y: box.y + box.height};
        },

        /**
         * Determines whether two boxes intersect (detects collisions)
         * @param {{x: Number, y: Number, height: Number, width: Number}} box1
         * @param {{x: Number, y: Number, height: Number, width: Number}} box2
         * @return {Boolean}
         */
        Intersect: function (box1, box2) {
            return !((this.Top(box1) > this.Bottom(box2)) ||
                (this.Bottom(box1) < this.Top(box2)) ||
                (this.Left(box1) > this.Right(box2)) ||
                (this.Right(box1) < this.Left(box2)));
        }
    };
})();