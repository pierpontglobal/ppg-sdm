import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from "react-redux";
import App from './App';
import configureStore from './modules/store';
import AppInitialState from './modules/appInitialState';
import Cookies from 'universal-cookie';
import messages_es from "./translations/es.json";
import messages_en from "./translations/en.json";
import locale_en from "react-intl/locale-data/en";
import locale_es from "react-intl/locale-data/es";
import { addLocaleData } from 'react-intl';

const PPGStore = configureStore(AppInitialState);

const cookies = new Cookies();

addLocaleData([...locale_en, ...locale_es]);

const messages = {
  es: messages_es,
  en: messages_en
};

let languages = [
  {
    abr: "es",
    name: 'Spanish',
    active: false
  },
  {
    abr: "en",
    name: 'English',
    active: true
  }
  // {
  //   abr: "fr",
  //   name: <FormattedMessage id="lang.french" />,
  //   active: false
  // },
];

const getBrowserLocale = () => navigator.language.split(/[-_]/)[0];

const currentLang = cookies.get('language', {path: '/'});

// Set default language
if (!!currentLang) {
  languages.forEach(lang => {
    if (lang.abr === currentLang) {
      lang.active = true;
    } else {
      lang.active = false;
    }
  })
}

let language = !!currentLang ? currentLang : getBrowserLocale() || 'es';

const setLanguage = (lang) => {
  language = lang.abr;
  renderApp();
}

const renderApp = () => {
  ReactDOM.render(
    <CookiesProvider>
      <ReduxProvider store={PPGStore}>
        <IntlProvider locale={language} messages={messages[language]}>
          <App changeLanguage={(lang) => setLanguage(lang)} languages={languages} language={language} />
        </IntlProvider>
      </ReduxProvider>
    </CookiesProvider>
    , document.getElementById('root'),
  );
}

renderApp();
