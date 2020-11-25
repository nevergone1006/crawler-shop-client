/**
 * @author sonnguyen
 */

// const WMS_HOST = process.env.WMS_HOST;
// const WMS_PORT = process.env.WMS_PORT;
const appConfig = {
	protocal: 'http://',
	// host: 'localhost',
	host: '159.65.12.111',
	port: 3030,
	token: {
		minValidity: 5
	},
};

const fullURLBase = `${appConfig.protocal}${appConfig.host}:${appConfig.port}`;

const authConfig = {
	storageKey: 'accesstoken',
	cookie: 'accesstoken',
	storage: localStorage,
};

export {
	appConfig,
	authConfig,
	fullURLBase,
};