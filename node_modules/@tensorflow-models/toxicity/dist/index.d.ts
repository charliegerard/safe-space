import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tfconv from '@tensorflow/tfjs-converter';
export { version } from './version';
export declare function load(threshold: number, toxicityLabels: string[]): Promise<ToxicityClassifier>;
export declare class ToxicityClassifier {
    private tokenizer;
    private model;
    private labels;
    private threshold;
    private toxicityLabels;
    constructor(threshold?: number, toxicityLabels?: string[]);
    loadModel(): Promise<tfconv.GraphModel>;
    loadTokenizer(): Promise<use.Tokenizer>;
    load(): Promise<void>;
    classify(inputs: string[] | string): Promise<Array<{
        label: string;
        results: Array<{
            probabilities: Float32Array;
            match: boolean;
        }>;
    }>>;
}
