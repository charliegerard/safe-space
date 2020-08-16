import { Tensor } from '../tensor';
import { TensorLike } from '../types';
/**
 * @deprecated
 * Strict version of `tf.notEqual` that forces `a` and `b` to be of the same
 * shape.
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same shape and dtype as
 *     `a`.
 */
declare function notEqualStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
/**
 * @deprecated
 * Strict version of `tf.less` that forces `a` and `b` to be of the same
 * shape.
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same shape and dtype as
 *     `a`.
 */
declare function lessStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
declare function equalStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
declare function lessEqualStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
declare function greaterStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
declare function greaterEqualStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
export declare const equalStrict: typeof equalStrict_;
export declare const greaterEqualStrict: typeof greaterEqualStrict_;
export declare const greaterStrict: typeof greaterStrict_;
export declare const lessEqualStrict: typeof lessEqualStrict_;
export declare const lessStrict: typeof lessStrict_;
export declare const notEqualStrict: typeof notEqualStrict_;
export {};
