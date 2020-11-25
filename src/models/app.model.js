/**
 * @author sonnguyen
 */
import FormModel from 'models/form.model';
import { observable } from 'mobx';

class ApppModel extends FormModel {

	@observable message = '';
}

export default ApppModel;
