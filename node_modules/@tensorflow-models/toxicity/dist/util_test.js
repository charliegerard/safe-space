"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
describe('Toxicity classifier util', function () {
    it('should pad inputs of different lengths', function () {
        var inputs = [[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]];
        expect(inputs.map(function (d) { return util_1.padInput(d); })).toEqual([
            [1, 2, 3, 0], [1, 2, 3, 4], [1, 2, 3, 4, 5, 0, 0, 0]
        ]);
    });
});
//# sourceMappingURL=util_test.js.map