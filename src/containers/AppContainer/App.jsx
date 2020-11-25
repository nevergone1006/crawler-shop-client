import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Router, Route, Switch, Redirect  } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AdminLayout from 'layouts/Admin.jsx';
import AuthenticateLayout from 'layouts/AuthenticateLayout';
import LoadingContainer from 'components/Loading/LoadingContainer';
import { USER_STORE } from 'constants/stores.const';
import { AUTH_STATUS, REQUEST_STATUS } from 'constants/common.const';

const history = createBrowserHistory();

@inject(USER_STORE)
@observer
class App extends Component {
	constructor(props) {
		super(props);
		this.userStore = props[USER_STORE];
	}

	renderPage = () => (
		<Router history={history}>
			<div className="viewport">
				<Switch>
					<Redirect exact from="/admin" to="/admin/dashboard" />
					<Redirect from="/authenticate" to="/" />
					<Route path="/admin" component={AdminLayout} />
					<Redirect from="/" to="/admin" />
				</Switch>
			</div>
		</Router>
	);

	renderAuthentication = () => (
		<Router history={history}>
			<div className="viewport">
				<Switch>
					<Redirect exact from="/authenticate" to="/authenticate/login" />
					<Route path="/authenticate" component={AuthenticateLayout} />
					<Redirect from="/" to="/authenticate" />
				</Switch>
			</div>
		</Router>
	);

	render() {
		const {
			authStatus,
			state,
		} = this.userStore;
		if (state === REQUEST_STATUS.INIT) {
			return (<LoadingContainer />);
		}
		switch (authStatus) {
		case AUTH_STATUS.AUTHENTICATED:
			return this.renderPage();
		case AUTH_STATUS.NOT_AUTHENTICATED:
		default:
			return this.renderAuthentication();
		}
	}
}

export default App;
