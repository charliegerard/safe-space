"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padInput = function (input) {
    var nearestBucket = 4;
    while (nearestBucket < input.length) {
        nearestBucket *= 2;
    }
    return input.concat(Array.from({ length: nearestBucket - input.length }, function () { return 0; }));
};
//# sourceMappingURL=util.js.map