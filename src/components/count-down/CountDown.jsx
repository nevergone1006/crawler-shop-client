import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CountDownModel from 'components/count-down/count-down.model';

@observer
class CountDown extends Component {
	constructor() {
		super();
		this.model = new CountDownModel({
			startNumber: 2000,
			endNumber: 0,
		});
	}

	countDownNumber = () => setInterval(() => {
		if (this.model.isFinished) {
			this.intervalCountDown && clearInterval(this.intervalCountDown);
		} else {
			this.model.countDownAction();
		}
	}, 1000);

	finishedCount = () => {
		this.intervalCountDown && clearInterval(this.intervalCountDown);
		this.model.setProperties({ number: this.model.end });
	}

	changeEnd = (event) => {
		this.model.setProperties({ end: parseInt(event.target.value) });
	}

	startAction = () => {
		this.intervalCountDown = this.countDownNumber();
	}

	render() {
		const { number, end, isFinished } = this.model;
		return (
			<div>
				Finish at: <h2> <input value={`${end}`} type="number" onChange={this.changeEnd} name="abc" /> </h2> <button onClick={this.startAction}>Start</button>
				<br />
				Countdown time: <h1 style={{ color: isFinished ? 'blue' : 'red' }}> {number} </h1>
				<button onClick={this.finishedCount}>Finish</button>
				<br />
			</div>
		);
	}
}

export default CountDown;
