import Dashboard from 'views/Dashboard.jsx';
// import Notifications from 'views/Notifications.jsx';
// import Icons from 'views/Icons.jsx';
// import Typography from 'views/Typography.jsx';
// import TableList from 'views/Tables.jsx';
// import Maps from 'views/Map.jsx';
// import UserPage from 'views/User.jsx';
// import UpgradeToPro from 'views/Upgrade.jsx';
import Login from 'components/Authenticate/Login/Login';
import ResetPassword from 'components/Authenticate/reset-password/ResetPassword';
import SignUp from 'components/Authenticate/Sign-up/SignUp';
import EditAccount from 'views/EditAccount/EditAccount';
import Shop from 'views/Shop/index';

export const routes = [
	{
		path: '/dashboard',
		name: 'Trang chủ',
		icon: 'nc-icon nc-bank',
		component: Dashboard,
		layout: '/admin'
	},
	// {
	// 	path: '/icons',
	// 	name: 'Icons',
	// 	icon: 'nc-icon nc-diamond',
	// 	component: Icons,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/maps',
	// 	name: 'Maps',
	// 	icon: 'nc-icon nc-pin-3',
	// 	component: Maps,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/notifications',
	// 	name: 'Notifications',
	// 	icon: 'nc-icon nc-bell-55',
	// 	component: Notifications,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/user-page',
	// 	name: 'User Profile',
	// 	icon: 'nc-icon nc-single-02',
	// 	component: UserPage,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/tables',
	// 	name: 'Table List',
	// 	component: TableList,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/typography',
	// 	name: 'Typography',
	// 	icon: 'nc-icon nc-caps-small',
	// 	component: Typography,
	// 	layout: '/admin'
	// },
	{
		path: '/edit',
		name: 'Danh sách người dùng',
		icon: 'nc-icon nc-single-02',
		component: EditAccount,
		layout: '/admin'
	},
	{
		path: '/shop',
		name: 'Danh sách cửa hàng',
		icon: 'nc-icon nc-tile-56',
		component: Shop,
		layout: '/admin'
	},
	// {
	// 	pro: true,
	// 	path: '/upgrade',
	// 	name: 'Upgrade to PRO',
	// 	icon: 'nc-icon nc-spaceship',
	// 	component: UpgradeToPro,
	// 	layout: '/admin'
	// }
];

export const authenticateRoute = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
		layout: '/authenticate'
	},
	{
		path: '/sign-up',
		name: 'Sign Up',
		component: SignUp,
		layout: '/authenticate',
	},
	{
		path: '/reset-password',
		name: 'Reset Password',
		component: ResetPassword,
		layout: '/authenticate',
	}
];