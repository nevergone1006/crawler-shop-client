/**
 * @author sonnguyen
 */
import { CollectionService } from 'services/collection.service';
import { USERS_SERVICE } from 'constants/service-name.const';

class MenuService extends CollectionService {
	constructor() {
		super({
			service: USERS_SERVICE,
		});
	}
}
export default new MenuService();
