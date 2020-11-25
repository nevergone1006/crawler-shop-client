import { SHOPS_SERVICE } from 'constants/service-name.const';
import HttpService from 'services/http';

class ShopService {
	getShopList = (params) => HttpService.client.service(SHOPS_SERVICE).find(params);
}
export default new ShopService();