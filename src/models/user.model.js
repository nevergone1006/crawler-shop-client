/**
 * @author dattq6
 */
import FormModel from 'models/form.model';
import { observable, action, computed } from 'mobx';
import { AUTH_STATUS, REQUEST_STATUS } from 'constants/common.const';
import HttpService from 'services/http';
import { appConfig } from 'config/default.conf';

class UserModel extends FormModel {
	@observable user;

	@observable authStatus;

	@observable state = REQUEST_STATUS.INIT;

	appStore;

	constructor(appStore) {
		super();
		this.appStore = appStore;
		let exp = 0;
		HttpService.client.passport.getJWT()
			.then((token) => {
				if (!token) {
					this.authStatus = AUTH_STATUS.NOT_AUTHENTICATED;
					Promise.resolve(token);
				} else {
					return HttpService.client.passport.verifyJWT(token);
				}
			})
			.then(
				(response) => {
					exp = response.exp;
					return HttpService.client.service('users').get(response.userId);
				}
			)
			.then((user) => {
				HttpService.client.set('user', user);
				const current = Math.floor(Date.now() / 1000);
				const expires_at = exp;
				const isExpired = current > expires_at - appConfig.token.minValidity;
				this.user = user;
				if (isExpired) {
					this.authStatus = AUTH_STATUS.NOT_AUTHENTICATED;
				} else {
					this.authStatus = AUTH_STATUS.AUTHENTICATED;
				}
				this.state = REQUEST_STATUS.DONE;
			})
			.catch(() => {
				this.authStatus = AUTH_STATUS.NOT_AUTHENTICATED;
				this.state = REQUEST_STATUS.DONE;
			});
	}

	@action
	doLogin = (username, password) => {
		this.state = REQUEST_STATUS.PENDING;
		this.authStatus = AUTH_STATUS.AUTHENTICATING;
		HttpService.client.authenticate({
			strategy: 'local',
			username,
			password,
		})
			.then((response) => {
				return HttpService.client.passport.verifyJWT(response.accessToken);
			})
			.then((payload) => {
				return HttpService.client.service('users').get(payload.userId);
			})
			.then((user) => {
				HttpService.client.set('user', user);
				this.state = REQUEST_STATUS.DONE;
				this.authStatus = AUTH_STATUS.AUTHENTICATED;
				this.user = user;
			})
			.catch((error) => {
				this.authStatus = AUTH_STATUS.NOT_AUTHENTICATED;
				this.state = REQUEST_STATUS.ERROR;
				console.error('Error authenticating!', error);
			});
	}

	@action
	doLogout = () => {
		HttpService.client.logout().then(() => {
			this.authStatus = AUTH_STATUS.NOT_AUTHENTICATED;
		});
	}

	@computed
	get userId() {
		return this.user ? this.user.id : '';
	}
}

export default UserModel;
