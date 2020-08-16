"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_util_1 = require("./test_util");
var tokenizer_1 = require("./tokenizer");
describe('Universal Sentence Encoder tokenizer', function () {
    var tokenizer;
    beforeAll(function () {
        tokenizer = new tokenizer_1.Tokenizer(test_util_1.stubbedTokenizerVocab);
    });
    it('basic usage', function () {
        expect(tokenizer.encode('Ilikeit.')).toEqual([11, 15, 16, 10]);
    });
    it('handles whitespace', function () {
        expect(tokenizer.encode('I like it.')).toEqual([11, 12, 13, 10]);
    });
    it('should normalize inputs', function () {
        expect(tokenizer.encode('ça')).toEqual(tokenizer.encode('c\u0327a'));
    });
    it('should handle unknown inputs', function () {
        expect(function () { return tokenizer.encode('😹'); }).not.toThrow();
    });
    it('should treat consecutive unknown inputs as a single word', function () {
        expect(tokenizer.encode('a😹😹')).toEqual([7, 0]);
    });
});
//# sourceMappingURL=tokenizer_test.js.map