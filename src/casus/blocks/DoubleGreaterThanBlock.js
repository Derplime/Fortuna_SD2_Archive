//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpriter/BooleanValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class DoubleGreaterThanBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '>');
	}

	evaluate(): BooleanValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return new BooleanValue(lRes.greaterThan(rRes));
	}

}

export default DoubleGreaterThanBlock;
