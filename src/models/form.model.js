/**
 * @author sonnguyen
 */
import { observable, action, set, toJS } from 'mobx';

export default class FormModel {
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
