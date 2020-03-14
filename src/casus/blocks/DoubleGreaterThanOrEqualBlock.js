//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleGreaterThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleGreaterThanOrEqualBlock', 'DOUBLE', 'BOOLEAN', '>=');
	}

	evaluate(): BooleanValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return new BooleanValue(lRes.equals(rRes) || lRes.greaterThan(rRes));
	}

}

export default DoubleGreaterThanOrEqualBlock;
