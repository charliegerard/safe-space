declare type OutputNode = [string[], number, number];
declare class TrieNode {
    parent: TrieNode;
    end: boolean;
    children: {
        [firstSymbol: string]: TrieNode;
    };
    word: OutputNode;
    constructor();
}
export declare class Trie {
    root: TrieNode;
    constructor();
    insert(word: string, score: number, index: number): void;
    commonPrefixSearch(ss: string[]): OutputNode[];
}
export {};
