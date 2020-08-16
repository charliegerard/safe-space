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
    (factory((global.toxicity = {}),global.tf,global.tf));
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
    function __awaiter$1(e,r,n,t){return new(n||(n=Promise))(function(o,i){function a(e){try{u(t.next(e));}catch(e){i(e);}}function s(e){try{u(t.throw(e));}catch(e){i(e);}}function u(e){e.done?o(e.value):new n(function(r){r(e.value);}).then(a,s);}u((t=t.apply(e,r||[])).next());})}function __generator$1(e,r){var n,t,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,t&&(o=2&i[0]?t.return:i[0]?t.throw||((o=t.return)&&o.call(t),0):t.next)&&!(o=o.call(t,i[1])).done)return o;switch(t=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,t=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=r.call(e,a);}catch(e){i=[6,e],t=0;}finally{n=o=0;}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}var stringToChars=function(e){for(var r=[],n=0,t=e;n<t.length;n++){var o=t[n];r.push(o);}return r},TrieNode=function(){return function(){this.parent=null,this.children={},this.end=!1,this.word=[[],0,0];}}(),Trie=function(){function e(){this.root=new TrieNode;}return e.prototype.insert=function(e,r,n){for(var t=this.root,o=stringToChars(e),i=0;i<o.length;i++)t.children[o[i]]||(t.children[o[i]]=new TrieNode,t.children[o[i]].parent=t,t.children[o[i]].word[0]=t.word[0].concat(o[i])),t=t.children[o[i]],i===o.length-1&&(t.end=!0,t.word[1]=r,t.word[2]=n);},e.prototype.commonPrefixSearch=function(e){for(var r=[],n=this.root.children[e[0]],t=0;t<e.length&&n;t++)n.end&&r.push(n.word),n=n.children[e[t+1]];return r.length||r.push([[e[0]],0,0]),r},e}(),separator="▁";function processInput(e){var r=e.normalize("NFKC");return separator+r.replace(/ /g,separator)}var RESERVED_SYMBOLS_COUNT=6,Tokenizer=function(){function e(e){this.vocabulary=e,this.trie=new Trie;for(var r=RESERVED_SYMBOLS_COUNT;r<this.vocabulary.length;r++)this.trie.insert(this.vocabulary[r][0],this.vocabulary[r][1],r);}return e.prototype.encode=function(e){var r=[],n=[],t=[];e=processInput(e);for(var o=stringToChars(e),i=0;i<=o.length;i++)r.push({}),n.push(0),t.push(0);for(i=0;i<o.length;i++)for(var a=this.trie.commonPrefixSearch(o.slice(i)),s=0;s<a.length;s++){var u=a[s],c={key:u[0],score:u[1],index:u[2]};null==r[i+(l=u[0].length)][i]&&(r[i+l][i]=[]),r[i+l][i].push(c);}for(var l=0;l<=o.length;l++)for(var h in r[l]){var f=r[l][h];for(s=0;s<f.length;s++){var d=f[s],p=d.score+t[l-d.key.length];(0===t[l]||p>=t[l])&&(t[l]=p,n[l]=f[s].index);}}for(var v=[],w=n.length-1;w>0;)v.push(n[w]),w-=this.vocabulary[n[w]][0].length;var g=[],_=!1;for(i=0;i<v.length;i++){var y=v[i];_&&0===y||g.push(y),_=0===y;}return g.reverse()},e}(),BASE_PATH="https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/";function loadTokenizer(e){return __awaiter$1(this,void 0,void 0,function(){var r;return __generator$1(this,function(n){switch(n.label){case 0:return[4,loadVocabulary(e)];case 1:return r=n.sent(),[2,new Tokenizer(r)]}})})}function loadVocabulary(e){return void 0===e&&(e=BASE_PATH+"vocab.json"),__awaiter$1(this,void 0,void 0,function(){return __generator$1(this,function(r){switch(r.label){case 0:return[4,tf.util.fetch(e)];case 1:return[2,r.sent().json()]}})})}

    var version$1 = '1.2.2';

    function load$1(threshold, toxicityLabels) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new ToxicityClassifier(threshold, toxicityLabels);
                        return [4, model.load()];
                    case 1:
                        _a.sent();
                        return [2, model];
                }
            });
        });
    }
    var ToxicityClassifier = (function () {
        function ToxicityClassifier(threshold, toxicityLabels) {
            if (threshold === void 0) { threshold = 0.85; }
            if (toxicityLabels === void 0) { toxicityLabels = []; }
            this.threshold = threshold;
            this.toxicityLabels = toxicityLabels;
        }
        ToxicityClassifier.prototype.loadModel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, tfconv.loadGraphModel('https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1', { fromTFHub: true })];
                });
            });
        };
        ToxicityClassifier.prototype.loadTokenizer = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, loadTokenizer()];
                });
            });
        };
        ToxicityClassifier.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, model, tokenizer;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, Promise.all([this.loadModel(), this.loadTokenizer()])];
                        case 1:
                            _a = _b.sent(), model = _a[0], tokenizer = _a[1];
                            this.model = model;
                            this.tokenizer = tokenizer;
                            this.labels =
                                model.outputs.map(function (d) { return d.name.split('/')[0]; });
                            if (this.toxicityLabels.length === 0) {
                                this.toxicityLabels = this.labels;
                            }
                            else {
                                tf.util.assert(this.toxicityLabels.every(function (d) { return _this.labels.indexOf(d) > -1; }), function () { return "toxicityLabels argument must contain only items from the " +
                                    ("model heads " + _this.labels.join(', ') + ", ") +
                                    ("got " + _this.toxicityLabels.join(', ')); });
                            }
                            return [2];
                    }
                });
            });
        };
        ToxicityClassifier.prototype.classify = function (inputs) {
            return __awaiter(this, void 0, void 0, function () {
                var encodings, indicesArr, flattenedIndicesArr, i, indices, values, labels;
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
                            return [4, this.model.executeAsync({ Placeholder_1: indices, Placeholder: values })];
                        case 1:
                            labels = _a.sent();
                            indices.dispose();
                            values.dispose();
                            return [2, labels
                                    .map(function (d, i) { return ({ data: d, headIndex: i }); })
                                    .filter(function (d) {
                                    return _this.toxicityLabels.indexOf(_this.labels[d.headIndex]) > -1;
                                })
                                    .map(function (d) {
                                    var prediction = d.data.dataSync();
                                    var results = [];
                                    for (var input = 0; input < inputs.length; input++) {
                                        var probabilities = prediction.slice(input * 2, input * 2 + 2);
                                        var match = null;
                                        if (Math.max(probabilities[0], probabilities[1]) > _this.threshold) {
                                            match = probabilities[0] < probabilities[1];
                                        }
                                        results.push({ probabilities: probabilities, match: match });
                                    }
                                    return { label: _this.labels[d.headIndex], results: results };
                                })];
                    }
                });
            });
        };
        return ToxicityClassifier;
    }());

    exports.load = load$1;
    exports.ToxicityClassifier = ToxicityClassifier;
    exports.version = version$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
