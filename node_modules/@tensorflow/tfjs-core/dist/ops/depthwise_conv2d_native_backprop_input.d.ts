import { Tensor3D, Tensor4D } from '../tensor';
import * as conv_util from './conv_util';
declare function depthwiseConv2dNativeBackpropInput_<T extends Tensor3D | Tensor4D>(xShape: [number, number, number, number] | [number, number, number], dy: T, filter: Tensor4D, convInfo: conv_util.Conv2DInfo): T;
export declare const depthwiseConv2dNativeBackpropInput: typeof depthwiseConv2dNativeBackpropInput_;
export {};
