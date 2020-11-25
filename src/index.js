import 'normalize-css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'stores/index';
import { IntlProvider } from 'react-intl';
import moment from 'moment-timezone';
import App from 'containers/AppContainer/App';
import * as serviceWorker from 'serviceWorker';
import { setupLocaleData, getMessageConfig, LANGUAGE_TYPE } from 'utils/messageIntl';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/scss/paper-dashboard.scss';
import 'assets/demo/demo.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'index.scss';

moment.tz.setDefault('Asia/Ho_Chi_Minh');

const language = LANGUAGE_TYPE.VI;
// Setup LocaleData
setupLocaleData();

const history = createBrowserHistory();
const appStore = createStores(history);

ReactDOM.render((
	<IntlProvider locale={language} messages={getMessageConfig(language)}>
		<Provider {...appStore}>
			<App />
		</Provider>
	</IntlProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
