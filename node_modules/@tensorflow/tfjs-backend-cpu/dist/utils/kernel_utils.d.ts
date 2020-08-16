/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
import { KernelConfig } from '@tensorflow/tfjs-core';
import { DataType, TypedArray } from '@tensorflow/tfjs-core';
export declare function createBinaryKernelConfig(name: string, op: (aShape: number[], bShape: number[], aVals: TypedArray, bVals: TypedArray, dtype: DataType) => [TypedArray, number[]]): KernelConfig;
export declare function createBinaryKernelImpl(op: (a: number, b: number) => number): (aShape: number[], bShape: number[], aVals: TypedArray, bVals: TypedArray, dtype: "string" | "float32" | "int32" | "bool" | "complex64") => [TypedArray, number[]];
