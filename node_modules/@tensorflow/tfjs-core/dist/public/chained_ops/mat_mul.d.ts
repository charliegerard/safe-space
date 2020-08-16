import { Rank, TensorLike } from '../../types';
declare module '../../tensor' {
    interface Tensor<R extends Rank = Rank> {
        matMul<T extends Tensor>(b: T | TensorLike, transposeA?: boolean, transposeB?: boolean): T;
    }
}
