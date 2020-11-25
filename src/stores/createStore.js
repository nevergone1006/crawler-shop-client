/**
 * @author sonnguyen
 */
import {
	USER_STORE, APP_STORE,
} from 'constants/stores.const';
import UserModel from 'models/user.model';
import AppModel from 'models/app.model';

export const createStores = () => {
	const appStore = new AppModel();
	const userStore = new UserModel(appStore);
	
	return {
		[USER_STORE]: userStore,
		[APP_STORE]: appStore,
	};
};
