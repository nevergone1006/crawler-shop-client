import { observable, computed, action } from 'mobx';
import { assign } from 'lodash';

class CountDownModel {
	constructor({ startNumber = 1000, endNumber = 0 }) {
		this.setProperties({
			number: startNumber,
			end: endNumber,
		});
	}

	@observable number;

	@observable end;
	
	@computed
	get isFinished () {
		return this.number <= this.end;
	}

	@action	
	countDownAction = () => {
		this.number = this.number > this.end ? this.number - 1 : this.end;
	}

	@action
	setProperties = (obj = {}) => {
		assign(this, obj);
	}
}

export default CountDownModel;
