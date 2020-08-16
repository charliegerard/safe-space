"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var trie_1 = require("./trie");
var separator = '\u2581';
function processInput(str) {
    var normalized = str.normalize('NFKC');
    return separator + normalized.replace(/ /g, separator);
}
var RESERVED_SYMBOLS_COUNT = 6;
var Tokenizer = (function () {
    function Tokenizer(vocabulary) {
        this.vocabulary = vocabulary;
        this.trie = new trie_1.Trie();
        for (var i = RESERVED_SYMBOLS_COUNT; i < this.vocabulary.length; i++) {
            this.trie.insert(this.vocabulary[i][0], this.vocabulary[i][1], i);
        }
    }
    Tokenizer.prototype.encode = function (input) {
        var nodes = [];
        var words = [];
        var best = [];
        input = processInput(input);
        var symbols = util_1.stringToChars(input);
        for (var i = 0; i <= symbols.length; i++) {
            nodes.push({});
            words.push(0);
            best.push(0);
        }
        for (var i = 0; i < symbols.length; i++) {
            var matches = this.trie.commonPrefixSearch(symbols.slice(i));
            for (var j = 0; j < matches.length; j++) {
                var piece = matches[j];
                var obj = { key: piece[0], score: piece[1], index: piece[2] };
                var endPos = piece[0].length;
                if (nodes[i + endPos][i] == null) {
                    nodes[i + endPos][i] = [];
                }
                nodes[i + endPos][i].push(obj);
            }
        }
        for (var endPos = 0; endPos <= symbols.length; endPos++) {
            for (var startPos in nodes[endPos]) {
                var arr = nodes[endPos][startPos];
                for (var j = 0; j < arr.length; j++) {
                    var word = arr[j];
                    var score = word.score + best[endPos - word.key.length];
                    if (best[endPos] === 0 || score >= best[endPos]) {
                        best[endPos] = score;
                        words[endPos] = arr[j].index;
                    }
                }
            }
        }
        var results = [];
        var iter = words.length - 1;
        while (iter > 0) {
            results.push(words[iter]);
            iter -= this.vocabulary[words[iter]][0].length;
        }
        var merged = [];
        var isPreviousUnk = false;
        for (var i = 0; i < results.length; i++) {
            var id = results[i];
            if (!(isPreviousUnk && id === 0)) {
                merged.push(id);
            }
            isPreviousUnk = id === 0;
        }
        return merged.reverse();
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=index.js.map