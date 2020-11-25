/**
 * @author sonnguyen
 */
import { observable, action, set, toJS } from 'mobx';

export default class TableModel {
	static DEFAULT_LIMIT = 20;

	@observable pagination = {
		total: 0,
		limit: TableModel.DEFAULT_LIMIT,
		skip: 0,
		current: 0,
		pageSize: 0,
	};

	constructor() {
		this.pagination = {
			limit: 10,
			skip: 0,
			current: 1,
			pageSize: 10
		};
	}

	/**
	 * Build parameters for feather client
	 */
	@action
	buildParams = (options) => ({
		query: {
			...this.buildPagination(),
			...options
		}
	});

	/**
	 * Build pagination for feather
	 */
	@action
	buildPagination = () => ({
		$limit: this.pagination.limit,
		$skip: this.pagination.skip,
	});

	/**
	 * Get properties of model and convert them to JS type
	 */
	@action
	getToJS = (property) => toJS(this[property]);

	/**
	 * Set a key inside a property
	 */
	@action
	setDeep = (property, key, value) => set(this[property], key, value);

	/**
	 * Set property value
	 */
	@action
	set = (property = {}) => Object.assign(this, property);

	/**
	 * Get property value
	 */
	@action
	get = (property) => this[property];
}
