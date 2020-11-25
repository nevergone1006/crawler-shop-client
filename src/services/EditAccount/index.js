import { USERS_SERVICE } from 'constants/service-name.const';
import HttpService from 'services/http';

class AccountService {
	getUserAccount = (params) => HttpService.client.service(USERS_SERVICE).find(params);
	createUserAccount = (_params, payload) => HttpService.client.service(USERS_SERVICE).create(payload);
	updateUserAccount = (params, payload) => HttpService.client.service(USERS_SERVICE).patch(params,payload);
	deleleUserAccount = (params) => HttpService.client.service(USERS_SERVICE).remove(params);
}
export default new AccountService();