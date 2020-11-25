import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Card, CardBody,} from 'reactstrap';

import { authenticateRoute } from 'routes';

import './style.scss';

export default class AuthenticateLayout extends React.Component {
	constructor(props) {
		super(props);
		this.mainPanel = React.createRef();
	}

	render() {
		return (
			<div className="authen-wrapper">
				<div className="main-panel" ref={this.mainPanel}>
					<Card>
						<CardBody>
							<Switch>
								{
									authenticateRoute.map((prop, key) => {							
										return (
											<Route
												path={prop.layout + prop.path}
												component={prop.component}
												key={key}
											/>
										);
									})
								}
							</Switch>
						</CardBody>
					</Card>
				</div> 
			</div>
		);
	}
}