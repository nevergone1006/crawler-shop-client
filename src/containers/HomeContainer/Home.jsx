import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import logo from 'images/logo.svg';
import './style.scss';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<header className="Home-header">
					<img src={logo} className="Home-logo" alt="logo" />
					<Button color="primary">primary</Button>
					<p>
						Edit <code>src/containers/HomeContainer/index.js</code> and save to reload.
					</p>
					<img src="/logo.png" className="Home-logo" alt="logo" />
					<a
						className="Home-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					<Link to="/test">test 123</Link>
				</header>
			</div>
		);
	}
}

export default Home;
