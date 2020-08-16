"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_util_1 = require("./test_util");
var tokenizer_1 = require("./tokenizer");
describe('Universal Sentence Encoder tokenizer', function () {
    var tokenizer;
    beforeAll(function () {
        tokenizer = new tokenizer_1.Tokenizer(test_util_1.stubbedTokenizerVocab);
    });
    it('Trie creates a child for each unique prefix', function () {
        var childKeys = Object.keys(tokenizer.trie.root.children);
        expect(childKeys).toEqual(['▁', 'a', '.', 'I', 'l', 'i', 'k', 'e', 't']);
    });
    it('Trie commonPrefixSearch basic usage', function () {
        var commonPrefixes = tokenizer.trie.commonPrefixSearch(['l', 'i', 'k', 'e'])
            .map(function (d) { return d[0].join(''); });
        expect(commonPrefixes).toEqual(['l', 'like']);
    });
});
//# sourceMappingURL=trie_test.js.map