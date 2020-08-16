import { Trie } from './trie';
declare type Vocabulary = Array<[string, number]>;
export declare class Tokenizer {
    vocabulary: Vocabulary;
    trie: Trie;
    constructor(vocabulary: Vocabulary);
    encode(input: string): number[];
}
export {};
