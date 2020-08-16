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
import { deprecationWarn } from '../../globals';
import { depthwiseConv2d } from '../../ops/depthwise_conv2d';
import { Tensor } from '../../tensor';
/**
 * @deprecated Use `depthwiseConv2d` instead.
 */
Tensor.prototype.depthwiseConv2D = function (filter, strides, pad, dataFormat, dilations, dimRoundingMode) {
    deprecationWarn('depthwiseConv2D is deprecated, use depthwiseConv2d instead');
    this.throwIfDisposed();
    return depthwiseConv2d(this, filter, strides, pad, dataFormat, dilations, dimRoundingMode);
};
//# sourceMappingURL=depthwise_conv2D_deprecated.js.map