import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_vi from 'react-intl/locale-data/vi';
import messages_en from 'translations/en.json';
import messages_vi from 'translations/vi.json';

export const LANGUAGE_TYPE = {
	EN: 'en',
	VI: 'vi',
};

export const messageConfig = {
	[LANGUAGE_TYPE.EN]: messages_en,
	[LANGUAGE_TYPE.VI]: messages_vi,
};

export const setupLocaleData = () => {
	addLocaleData([...locale_vi, ...locale_en]);
};

export const getMessageConfig = (language) => {
	return messageConfig[language];
};
