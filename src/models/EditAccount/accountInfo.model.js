import { observable, computed, action } from 'mobx';
import { pick } from 'lodash';
import { USER_ROLES } from 'constants/common.const';
import editAccount from 'services/EditAccount';

class AccountInfo {
	constructor(props = {}) {
		this.initData(props.userData);
		this.service = editAccount;
	}

	@observable _id;

	@observable name = '';

	@observable username = '';

	@observable password = '';

	@observable confirmPassword = '';

	@observable role = USER_ROLES.NORMAL;

	@observable phone = '';

	@observable email = '';

	@observable errors;

	storeRole;

	@action
	initData = (userData) => {
		if (userData) {
			const data = pick(userData, [
				'_id', 'name', 'username', 'role', 'phone', 'email',
			]);
			data.storeRole = data.role;
			this.setProperties(data);
		}
	}

	@action
	onAccountInfoChange = (i) => {
		const { name, value } = i.target;
		Object.assign(this, {
			errors: null,
			[name]: value,
		});
	}

	@action
	onUpdateAccount = () => {
		const { accountInfoData, isUpdate, _id} = this;
		const request = !isUpdate ? this.service.createUserAccount(null, accountInfoData) : this.service.updateUserAccount(_id, accountInfoData);
		return request;
	}

	@action
	setProperties = (change = {}) => {
		Object.assign(this, change);
	}

	@computed
	get isUpdate() {
		return !!this._id;
	}

	@computed
	get accountInfoData() {
		if (this._id) {
			return {
				name: this.name,
				role: this.role,
				phone: this.phone,
				email: this.email,
			};
		}
		return {
			username: this.username,
			password: this.password,
			name: this.name,
			role: this.role,
			phone: this.phone,
			email: this.email,
		};
	}
}

export default AccountInfo;
