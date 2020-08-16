/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
import * as tfc from '@tensorflow/tfjs-core';
import { getParamValue, getTensor } from './utils';
export const executeOp = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Abs':
        case 'ComplexAbs':
            return [tfc.abs(getParamValue('x', node, tensorMap, context))];
        case 'Acos':
            return [tfc.acos(getParamValue('x', node, tensorMap, context))];
        case 'Acosh':
            return [tfc.acosh(getParamValue('x', node, tensorMap, context))];
        case 'Asin':
            return [tfc.asin(getParamValue('x', node, tensorMap, context))];
        case 'Asinh':
            return [tfc.asinh(getParamValue('x', node, tensorMap, context))];
        case 'Atan':
            return [tfc.atan(getParamValue('x', node, tensorMap, context))];
        case 'Atan2':
            return [tfc.atan2(getParamValue('x', node, tensorMap, context), getParamValue('y', node, tensorMap, context))];
        case 'Atanh':
            return [tfc.atanh(getParamValue('x', node, tensorMap, context))];
        case 'Ceil':
            return [tfc.ceil(getParamValue('x', node, tensorMap, context))];
        case 'Complex':
            return [tfc.complex(getParamValue('real', node, tensorMap, context), getParamValue('imag', node, tensorMap, context))];
        case 'Cos':
            return [tfc.cos(getParamValue('x', node, tensorMap, context))];
        case 'Cosh':
            return [tfc.cosh(getParamValue('x', node, tensorMap, context))];
        case 'Elu':
            return [tfc.elu(getParamValue('x', node, tensorMap, context))];
        case 'Erf':
            return [tfc.erf(getParamValue('x', node, tensorMap, context))];
        case 'Exp':
            return [tfc.exp(getParamValue('x', node, tensorMap, context))];
        case 'Expm1': {
            return [tfc.expm1(getParamValue('x', node, tensorMap, context))];
        }
        case 'Floor':
            return [tfc.floor(getParamValue('x', node, tensorMap, context))];
        case 'Log':
            return [tfc.log(getParamValue('x', node, tensorMap, context))];
        case 'Log1p': {
            return [tfc.log1p(getParamValue('x', node, tensorMap, context))];
        }
        case 'Imag':
            return [tfc.imag(getParamValue('x', node, tensorMap, context))];
        case 'Neg':
            return [tfc.neg(getParamValue('x', node, tensorMap, context))];
        case 'Reciprocal': {
            return [tfc.reciprocal(getParamValue('x', node, tensorMap, context))];
        }
        case 'Real':
            return [tfc.real(getParamValue('x', node, tensorMap, context))];
        case 'Relu':
            return [tfc.relu(getParamValue('x', node, tensorMap, context))];
        case 'Round': {
            return [tfc.round(getParamValue('x', node, tensorMap, context))];
        }
        case 'Selu':
            return [tfc.selu(getParamValue('x', node, tensorMap, context))];
        case 'Sigmoid':
            return [tfc.sigmoid(getParamValue('x', node, tensorMap, context))];
        case 'Sin':
            return [tfc.sin(getParamValue('x', node, tensorMap, context))];
        case 'Sign': {
            return [tfc.sign(getParamValue('x', node, tensorMap, context))];
        }
        case 'Sinh': {
            return [tfc.sinh(getParamValue('x', node, tensorMap, context))];
        }
        case 'Softplus': {
            return [tfc.softplus(getParamValue('x', node, tensorMap, context))];
        }
        case 'Sqrt': {
            return [tfc.sqrt(getParamValue('x', node, tensorMap, context))];
        }
        case 'Square': {
            return [tfc.square(getParamValue('x', node, tensorMap, context))];
        }
        case 'Tanh': {
            return [tfc.tanh(getParamValue('x', node, tensorMap, context))];
        }
        case 'Tan':
            return [tfc.tan(getParamValue('x', node, tensorMap, context))];
        case 'Relu6':
        case 'ClipByValue':
            return [tfc.clipByValue(getParamValue('x', node, tensorMap, context), getParamValue('clipValueMin', node, tensorMap, context), getParamValue('clipValueMax', node, tensorMap, context))];
        case 'Rsqrt':
            return [tfc.rsqrt(getTensor(node.inputNames[0], tensorMap, context))];
        case 'Prod':
            return [tfc.prod(getParamValue('x', node, tensorMap, context), getParamValue('axes', node, tensorMap, context))];
        case 'LeakyRelu':
            return [tfc.leakyRelu(getParamValue('x', node, tensorMap, context), getParamValue('alpha', node, tensorMap, context))];
        case 'Prelu':
            return [tfc.prelu(getParamValue('x', node, tensorMap, context), getParamValue('alpha', node, tensorMap, context))];
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};
export const CATEGORY = 'basic_math';
//# sourceMappingURL=basic_math_executor.js.map