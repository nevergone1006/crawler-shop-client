/**
 * @author sonnguyen
 */

export const AUTH_STATUS = {
	NOT_AUTHENTICATED: 'not_authenticated',
	AUTHENTICATING: 'authenticating',
	AUTHENTICATED: 'authenticated',
	LOGOUT: 'logout'
};

export const REQUEST_STATUS = {
	INIT: 'init',
	PENDING: 'pending',
	DONE: 'done',
	ERROR: 'error',
};

export const FORM_COLUMN_LAYOUTS = Object.freeze({
	'1': { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
	'2': { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
	'3': { xs: 24, sm: 8, md: 8, lg: 8, xl: 8 },
	'4': { xs: 24, sm: 6, md: 6, lg: 6, xl: 6 },
});

export const USER_ROLES = {
	SUPERADMIN: 'superadmin',
	ADMIN: 'admin',
	NORMAL: 'normal',
};

export const ADMIN_ROLES = [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN];

export const FORM_ITEM_TYPE = Object.freeze({
	inline: {
		labelCol: { xs: { span: 24 }, sm: { span: 8 } },
		wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
	},
	wrap: {
		labelCol: { xs: { span: 24 }, sm: { span: 24 } },
		wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
		colon: false,
	},
	noLabel: {
		wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
	},
});

export const DATE_FORMAT_STRING = 'DD-MM-YYYY';

export const TIME_FORMAT_STRING = 'HH:mm:ss DD-MM-YYYY';
