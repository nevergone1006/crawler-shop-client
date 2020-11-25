/**
 * @author sonnguyen
 */
import { observable, action, computed } from 'mobx';
import { isEmpty } from 'lodash';
import FormModel from 'models/form.model';

export default class LoginModel extends FormModel {
	static USERNAME_LENGTH = 6;

	@observable username = '';

	@observable password = '';

	@computed
	get invalidEmail() {
		return isEmpty(this.username) || this.username.length < LoginModel.USERNAME_LENGTH;
	}
}
