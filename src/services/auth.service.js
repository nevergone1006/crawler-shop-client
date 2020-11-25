/**
 * @author sonnguyen
 */
import HttpService from 'services/http';

class AuthService {
	doAuth = ({ strategy, email, password }) => {
		return HttpService.client.authenticate({
			strategy: strategy || 'local',
			email: email,
			password: password,
		});
	}
}
export default new AuthService();
