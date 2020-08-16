import { Tensor3D, Tensor4D } from '../tensor';
import * as conv_util from './conv_util';
declare function depthwiseConv2dNativeBackpropFilter_<T extends Tensor3D | Tensor4D>(x: T, dy: T, filterShape: [number, number, number, number], convInfo: conv_util.Conv2DInfo): Tensor4D;
export declare const depthwiseConv2dNativeBackpropFilter: typeof depthwiseConv2dNativeBackpropFilter_;
export {};
