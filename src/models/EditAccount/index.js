import { observable, computed, action } from 'mobx';
import editAccount from 'services/EditAccount';
import AccountInfo from './accountInfo.model';

class EditAccount {
	constructor() {
		this.service = editAccount;

		this.initData();
	}

	@observable modalOpen = false;

	@observable userAccount = [];

	@observable selectedItem;

	@observable currentPage = 0;

	@observable pagesCount = 0;

	@observable limit = 100;

	@computed
	get query() {
		return {
			query: {
				$limit: this.limit,
				$skip: this.currentPage * this.limit,
			}
		};
	}


	@action
	handleChangePage = (e, index) => {
		e.preventDefault();
		this.setProperties({
			currentPage: index,
		});
		
		this.initData();
	}

	@action
	initData = () => {
		this.accountInfo = new AccountInfo();
		this.service.getUserAccount(this.query).then(res => {
			const { data, total, limit } = res;

			this.userAccount = data;
			this.setProperties({
				userAccount: data,
				limit,
				pagesCount: Math.ceil(total/limit)
			});
		});
	}

	@action
	handleDeleteAccount = (id) => {
		this.service.deleleUserAccount(id).then(this.initData);
	}

	@action
	toggleModal = (selectedItem) => {
		const { setProperties } = this;
		setProperties({
			modalOpen: true,
			selectedItem,
		});
	}

	@action
	cancelModal = (isSuccess) => {
		if (isSuccess) {
			this.initData();
		}
		const { setProperties } = this;
		setProperties({
			modalOpen: false,
			selectedItem: undefined,
		});
	}

	@action
	setProperties = (change = {}) => {
		Object.assign(this, change);
	}
}

export default EditAccount;
