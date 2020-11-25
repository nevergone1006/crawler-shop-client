import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import CountDown from 'components/count-down/CountDown';
import logo from 'images/logo.svg';
import './style.scss';

class Test extends Component {
	render() {
		return (
			<div className="Home">
				<header className="Home-header">
					<img src={logo} className="Home-logo" alt="logo" />
					<h1 className="App-title">
						<FormattedMessage
							id="app.title"
							defaultMessage="defaultMessage Welcome to {what}"
							description="Welcome header on app main page"
							values={{ what: 'react-intl' }}
						/>
					</h1>
					<FormattedHTMLMessage
						id="app.intro"
						defaultMessage="To get started, edit <code>src/App.js</code> and save to reload."
						description="Text on main page"
					/>
					<CountDown />
				</header>
			</div>
		);
	}
}

export default Test;
