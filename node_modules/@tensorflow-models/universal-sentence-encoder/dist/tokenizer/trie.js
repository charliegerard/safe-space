"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var TrieNode = (function () {
    function TrieNode() {
        this.parent = null;
        this.children = {};
        this.end = false;
        this.word = [[], 0, 0];
    }
    return TrieNode;
}());
var Trie = (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    Trie.prototype.insert = function (word, score, index) {
        var node = this.root;
        var symbols = util_1.stringToChars(word);
        for (var i = 0; i < symbols.length; i++) {
            if (!node.children[symbols[i]]) {
                node.children[symbols[i]] = new TrieNode();
                node.children[symbols[i]].parent = node;
                node.children[symbols[i]].word[0] = node.word[0].concat(symbols[i]);
            }
            node = node.children[symbols[i]];
            if (i === symbols.length - 1) {
                node.end = true;
                node.word[1] = score;
                node.word[2] = index;
            }
        }
    };
    Trie.prototype.commonPrefixSearch = function (ss) {
        var output = [];
        var node = this.root.children[ss[0]];
        for (var i = 0; i < ss.length && node; i++) {
            if (node.end) {
                output.push(node.word);
            }
            node = node.children[ss[i + 1]];
        }
        if (!output.length) {
            output.push([[ss[0]], 0, 0]);
        }
        return output;
    };
    return Trie;
}());
exports.Trie = Trie;
//# sourceMappingURL=trie.js.map