import * as tfconv from '@tensorflow/tfjs-converter';
import * as tf from '@tensorflow/tfjs-core';
import { Tokenizer } from './tokenizer';
export { version } from './version';
export declare function load(): Promise<UniversalSentenceEncoder>;
export declare function loadTokenizer(pathToVocabulary?: string): Promise<Tokenizer>;
export declare class UniversalSentenceEncoder {
    private model;
    private tokenizer;
    loadModel(): Promise<tfconv.GraphModel>;
    load(): Promise<void>;
    embed(inputs: string[] | string): Promise<tf.Tensor2D>;
}
export { Tokenizer };
