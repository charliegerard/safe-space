/**
    * @license
    * Copyright 2019 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-converter'), require('@tensorflow/tfjs-core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-converter', '@tensorflow/tfjs-core'], factory) :
    (factory((global.use = {}),global.tf,global.tf));
}(this, (function (exports,tfconv,tf) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var stringToChars = function (input) {
        var symbols = [];
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var symbol = input_1[_i];
            symbols.push(symbol);
        }
        return symbols;
    };

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
            var symbols = stringToChars(word);
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

    var separator = '\u2581';
    function processInput(str) {
        var normalized = str.normalize('NFKC');
        return separator + normalized.replace(/ /g, separator);
    }
    var RESERVED_SYMBOLS_COUNT = 6;
    var Tokenizer = (function () {
        function Tokenizer(vocabulary) {
            this.vocabulary = vocabulary;
            this.trie = new Trie();
            for (var i = RESERVED_SYMBOLS_COUNT; i < this.vocabulary.length; i++) {
                this.trie.insert(this.vocabulary[i][0], this.vocabulary[i][1], i);
            }
        }
        Tokenizer.prototype.encode = function (input) {
            var nodes = [];
            var words = [];
            var best = [];
            input = processInput(input);
            var symbols = stringToChars(input);
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

    var version = '1.2.2';

    var BASE_PATH = 'https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/';
    function load() {
        return __awaiter(this, void 0, void 0, function () {
            var use;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        use = new UniversalSentenceEncoder();
                        return [4, use.load()];
                    case 1:
                        _a.sent();
                        return [2, use];
                }
            });
        });
    }
    function loadTokenizer(pathToVocabulary) {
        return __awaiter(this, void 0, void 0, function () {
            var vocabulary, tokenizer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, loadVocabulary(pathToVocabulary)];
                    case 1:
                        vocabulary = _a.sent();
                        tokenizer = new Tokenizer(vocabulary);
                        return [2, tokenizer];
                }
            });
        });
    }
    function loadVocabulary(pathToVocabulary) {
        if (pathToVocabulary === void 0) { pathToVocabulary = BASE_PATH + "vocab.json"; }
        return __awaiter(this, void 0, void 0, function () {
            var vocabulary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, tf.util.fetch(pathToVocabulary)];
                    case 1:
                        vocabulary = _a.sent();
                        return [2, vocabulary.json()];
                }
            });
        });
    }
    var UniversalSentenceEncoder = (function () {
        function UniversalSentenceEncoder() {
        }
        UniversalSentenceEncoder.prototype.loadModel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, tfconv.loadGraphModel('https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1', { fromTFHub: true })];
                });
            });
        };
        UniversalSentenceEncoder.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, model, vocabulary;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, Promise.all([this.loadModel(), loadVocabulary()])];
                        case 1:
                            _a = _b.sent(), model = _a[0], vocabulary = _a[1];
                            this.model = model;
                            this.tokenizer = new Tokenizer(vocabulary);
                            return [2];
                    }
                });
            });
        };
        UniversalSentenceEncoder.prototype.embed = function (inputs) {
            return __awaiter(this, void 0, void 0, function () {
                var encodings, indicesArr, flattenedIndicesArr, i, indices, values, embeddings;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof inputs === 'string') {
                                inputs = [inputs];
                            }
                            encodings = inputs.map(function (d) { return _this.tokenizer.encode(d); });
                            indicesArr = encodings.map(function (arr, i) { return arr.map(function (d, index) { return [i, index]; }); });
                            flattenedIndicesArr = [];
                            for (i = 0; i < indicesArr.length; i++) {
                                flattenedIndicesArr =
                                    flattenedIndicesArr.concat(indicesArr[i]);
                            }
                            indices = tf.tensor2d(flattenedIndicesArr, [flattenedIndicesArr.length, 2], 'int32');
                            values = tf.tensor1d(tf.util.flatten(encodings), 'int32');
                            return [4, this.model.executeAsync({ indices: indices, values: values })];
                        case 1:
                            embeddings = _a.sent();
                            indices.dispose();
                            values.dispose();
                            return [2, embeddings];
                    }
                });
            });
        };
        return UniversalSentenceEncoder;
    }());

    exports.load = load;
    exports.loadTokenizer = loadTokenizer;
    exports.UniversalSentenceEncoder = UniversalSentenceEncoder;
    exports.Tokenizer = Tokenizer;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
