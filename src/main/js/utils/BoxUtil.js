var Taka = (Taka) ? Taka : {};

var BoxUtil = {
    Top: function(box) {
        "use strict";
        return box.y;
    },

    Bottom: function(box) {
        "use strict";
        return box.y + box.height;
    },

    Left: function(box) {
        "use strict";
        return box.x;
    },

    Right: function(box) {
        "use strict";
        return box.x + box.width;
    },

    Center: function(box) {
        "use strict";
        return { x: box.x + (box.width / 2), y: box.y + (box.height / 2) };
    },

    TopLeft: function(box) {
        "use strict";
        return {x: box.x, y: box.y};
    },

    TopRight: function(box) {
        "use strict";
        return {x: box.x + (box.width), y: box.y};
    },

    BottomLeft: function(box) {
        "use strict";
        return {x: box.x, y: box.y + box.height};
    },

    BottomRight: function(box) {
        "use strict";
        return {x: box.x + (box.width), y: box.y + box.height};
    },

    Intersect: function(box1, box2) {
        "use strict";
        return !((Taka.utils.BoxUtil.Top(box1) > Taka.utils.BoxUtil.Bottom(box2)) ||
                 (Taka.utils.BoxUtil.Bottom(box1) < Taka.utils.BoxUtil.Top(box2)) ||
                  (Taka.utils.BoxUtil.Left(box1) > Taka.utils.BoxUtil.Right(box2)) ||
                 (Taka.utils.BoxUtil.Right(box1) < Taka.utils.BoxUtil.Left(box2)));
    }
};

Taka.utils.BoxUtil = BoxUtil;