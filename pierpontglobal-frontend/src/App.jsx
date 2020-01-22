import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { withCookies } from "react-cookie";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import styled from "styled-components";
import {
  injectIntl
} from "react-intl";
import { connect } from 'react-redux';

import USER_ACTIONS from './modules/user/action';
import SETTINGS_ACTIONS from './modules/settings/actions';
import SavedCarsDrawer from "./components/SavedCars/SavedCarsDrawer";
import MarketPlacePage from "./components/pages/MarketPlacePage/MarketPlacePage";
import NotfoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import CarPage from "./components/pages/CarBidPage/CarBidPage";
import ContactPage from "./components/pages/ContactPage/ContactPage";
import ConstructionMarket from "./components/pages/ConstructionMarket/ConstructionMarket";
import NotificationPage from "./components/pages/NotificationPage/NotificationPage";
import "./styles.css";
import AppNav from "./components/AppNav/AppNav";
import { DefaultTheme, OneSignalKey, ApiServer } from "./Defaults";
import OauthPage from "./components/pages/OauthPage/OauthPage";
import WhatsApp from "./components/Modal/WhatsApp/WhatsApp";
import SupportPage from "./components/pages/SupportPage/SupportPage.jsx";
import SignInPage, { RecoverPage } from "./components/pages/SignInPage/SignInPage";
import ApplicationRoutes from "./constants/Routes";
import withAPI from './hocs/withAPI';
import ConstructionCart from './components/pages/ConstructionMarket/ConstructionCart/ConstructionCart';

const car = {
  year: "2017",
  make: "Hyundai",
  model: "Santa Fe",
  trimLevel: "Limited",
  odometer: "9 440 mi",
  fuelType: "Gasoline",
  engine: "6 cylinder",
  displacement: "3.3 L",
  transmission: "Automatic",
  interiorColor: "black",
  exteriorColor: "white",
  vin: "L974FFH73523GSB353Z0",
  bodyStyle: "MPV",
  doors: "Not Available",
  vehicleType: "SUV",
  score: "4.3",
  price: "$ 21 975",
  saleDate: "01/ 20 / 2017 (Cutoff) 9:00 AM ET",
  images: [
    "https://static.cargurus.com/images/site/2015/05/29/11/43/2015_hyundai_santa_fe_2_0t_sport-pic-4662568588414365370-640x480.jpeg",
    "https://static.cargurus.com/images/site/2018/08/12/15/45/2015_hyundai_santa_fe_sport_2_4l_fwd-pic-1449050980195395017-640x480.jpeg",
    "https://static.cargurus.com/images/site/2015/03/17/18/44/2015_hyundai_santa_fe_sport-pic-3111940996015372984-640x480.jpeg"
  ],
  title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`
};

const PageHolder = styled.div`
  margin-top: ${props => (props.isInSignInPage ? "0px" : "58px")};
  height: ${props =>
    props.isInSignInPage ? "100%" : "-moz-calc(100% - 58px)"};
  height: ${props =>
    props.isInSignInPage ? "100%" : "-webkit-calc(100% - 58px)"};
  height: ${props => (props.isInSignInPage ? "100%" : "calc(100% - 58px)")};

  & > div {
    height: 100%;
    overflow: auto;
  }
`;

class App extends React.Component {
  constructor(props) {
    clearTimeout(window.fallbackReload);
    super(props);

    this.state = {
      showSavedCarsPanel: false,
      userSignedIn: false,
      dealer: {
        image: null,
        name: null,
        address: null,
        email: null,
        number: null
      },
      user: {},
    };

    axios.defaults.xsrfCookieName = "CSRF-TOKEN";
    axios.defaults.xsrfHeaderName = "X-CSRF-Token";
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
      config => {
        let token = this.props.cookies.get("token")
        config.headers = {}
        if (token) {
          config.headers['Authorization'] = token;
        }
        config.params = { lang: this.state.language };
        return config;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(response => response,
      (error) => {
        if (error.response.request.responseURL.includes('oauth/token')) {
          return error.response;
        } if (error.response.status === 401 &&
          (
            error.response.data === 'Signature has expired' ||
            error.response.data === 'nil user'
          )) {
          this.props.cookies.remove('token');
          window.location.href = '/?signIn=true';
        }
        return Promise.reject(error);
      });

    this.verifyUserLoggedIn = this.verifyUserLoggedIn.bind(this);

    this.marketplaceRef = React.createRef();
    this.appNav = React.createRef();
  }

  setDealer = dealer => {
    this.setState({
      dealer
    });
  };

  componentWillMount = async () => {
    this.setLanguageData();
  }

  componentDidMount() {
    const { cookies } = this.props;

    const isLoggedIn = this.verifyUserLoggedIn();

    if (isLoggedIn) {
      this.getUser();
      this.getSavedCars();
    }

    this.OneSignal = window.OneSignal || [];

    this.OneSignal.push(() => {
      this.OneSignal.init({
        appId: OneSignalKey,
        allowLocalhostAsSecureOrigin: true
      });

      this.OneSignal.on("subscriptionChange", isSubscribed => {
        // console.log(`The user subscription status is: ${isSubscribed}`);
        this.OneSignal.getUserId(id => {
          if (isSubscribed) {
            if (cookies.get("token", { path: "/" })) {
              axios.post(`${ApiServer}/api/v1/user/notifier`, {
                one_signal_uuid: id
              });
            }
            cookies.set("one_signal_uuid", id, {
              expires: new Date(
                new Date().setFullYear(new Date().getFullYear() + 5)
              )
            });
          } else {
            if (cookies.get("token", { path: "/" })) {
              axios.delete(
                `${ApiServer}/api/v1/user/notifier?one_signal_uuid=${id}`
              );
            }
            cookies.remove("one_signal_uuid", { path: "/" });
          }
        });
      });
    });
  }

  setLanguageData = () => {
    const { language, languages, setLanguage, setLanguages } = this.props;
    setLanguages(languages);
    setLanguage(language);
  }

  setLanguage = lang => {
    const { setLanguage, setLanguages, languages } = this.props;
    const langs = [...languages];

    const { cookies } = this.props;
    cookies.set("language", lang.abr, { path: "/" });

    langs.forEach(lg => {
      if (lg.abr === lang.abr) {
        lg.active = true;
      } else {
        lg.active = false;
      }
    });

    setLanguage(lang.abr);
    setLanguages(langs);

    this.props.changeLanguage(lang);
  };

  setMarketLayout = () => {
    const { cookies, setMarketLayout } = this.props;
    setMarketLayout(cookies.get("switch_marletplace", { path: '/' }));
  }

  getSavedCars = async () => {
    const { fetchSavedCars } = this.props;
    await fetchSavedCars();
  }

  getUser = async () => {
    const { createUser } = this.props;
    const responseUser = (await axios.get(`${ApiServer}/api/v1/user`)).data;

    let user = {
      name: responseUser.first_name,
      address: `${responseUser.address.primary_address} ${
        responseUser.address.secondary_address
        }, ${responseUser.address.zip_code}, ${responseUser.address.city} ${
        responseUser.address.country
        }`,
      email: responseUser.email,
      phone: responseUser.phone_number,
      photo: !!responseUser.photo_url ? `${ApiServer}/${responseUser.photo_url}` : undefined,
      roles: [...responseUser.roles, "Test"],
      dealer: !!responseUser.dealer ? {
        name: responseUser.dealer.name,
        latitude: responseUser.dealer.latitude,
        longitude: responseUser.dealer.longitude,
        logo: !!responseUser.dealer.logo_url ? `${ApiServer}/${responseUser.dealer.logo_url}` : undefined,
        phone: responseUser.dealer.phone_number,
        changingPhoto: false,
      } : {}
    }

    createUser(user);
    if (!!this.appNav) {
      this.appNav.addConstructionLink(user.roles);
    }
    if (!!this.constructionMarket) {
      this.constructionMarket.hasRole("construction")
    }
  };

  verifyUserLoggedIn() {
    const { cookies } = this.props;
    if (cookies.get("token", { path: "/" })) {
      return true;
    }
    return false;
  }

  toggleSavedCarsPanel = () => {
    this.setState(
      (prevState, props) => ({
        showSavedCarsPanel: !prevState.showSavedCarsPanel
      }));
  };

  updateCarsList = (vin) => {
    if (!!this.marketplaceRef) {
      this.marketplaceRef.toggleBookmarkedCar(vin);
    }
  };

  showSavedCars = () => {
    this.setState({
      showSavedCarsPanel: true,
    });
  };

  handleSignIn = async () => {
    await this.getUser();
  }

  render() {
    const { cookies, user, settings } = this.props;
    const userSignedIn = this.verifyUserLoggedIn();

    return (
      <MuiThemeProvider theme={DefaultTheme}>
        <div>
          <Router>
            <div
              style={{
                position: "fixed",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {!userSignedIn ? null : (
                <>
                  <AppNav
                    handleOpenSavedCars={this.showSavedCars}
                    languages={settings.languages}
                    setLang={this.setLanguage}
                    cookies={cookies}
                    verifyUserLoggedIn={this.verifyUserLoggedIn}
                    user={user}
                    onRef={ref => (this.appNav = ref)}
                  />
                  {!this.verifyUserLoggedIn() ? null : (
                    <>
                      <SavedCarsDrawer
                        updateCarsList={this.updateCarsList}
                        open={this.state.showSavedCarsPanel}
                        handleClose={() => this.toggleSavedCarsPanel()}
                      />
                    </>
                  )}
                </>
              )}
              <PageHolder isInSignInPage={!userSignedIn}>
                <Switch>
                  <Route
                    exact
                    path={ApplicationRoutes.oauthPage}
                    render={() => <OauthPage />}
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.changePassword}
                    render={() => <RecoverPage />}
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.home}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <Redirect to="/user" />
                      ) : (
                          <SignInPage handleSignIn={this.handleSignIn} cookies={cookies} />
                        )
                    }
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.marketplace}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <MarketPlacePage
                          onRef={ref => (this.marketplaceRef = ref)}
                          cookies={cookies}
                        />
                      ) : (
                          <Redirect to="/" />
                        )
                    }
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.constructionPage}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <ConstructionMarket
                          cookies={cookies}
                          user={user}
                          getUser={this.getUser}
                          onRef={ref => (this.constructionMarket = ref)}
                        />
                      ) : (
                          <Redirect to={ApplicationRoutes.marketplace} />
                        )
                    }
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.constructionCartPage}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <ConstructionCart
                          cookies={cookies}
                          user={user}
                          getUser={this.getUser}
                          onRef={ref => (this.constructionCart = ref)}
                        />
                      ) : (
                          <Redirect to={ApplicationRoutes.marketplace} />
                        )
                    }
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.carPage}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <CarPage cookies={cookies} car={car} />
                      ) : (
                          <Redirect to="/" />
                        )
                    }
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.registrationPage}
                    render={() => <RegistrationPage cookies={cookies} />}
                  />
                  <Route
                    path={ApplicationRoutes.profilePage.default}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <ProfilePage
                          setDealer={this.setDealer}
                          cookies={cookies}
                          user={user}
                        />
                      ) : (
                          <Redirect to="/" />
                        )
                    }
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.notificationPage}
                    render={() =>
                      this.verifyUserLoggedIn() ? (
                        <NotificationPage cookies={cookies} />
                      ) : (
                          <Redirect to="/" />
                        )
                    }
                  />

                  <Route
                    exact
                    path={ApplicationRoutes.contactPage}
                    render={() => <ContactPage user={user} cookies={cookies} />}
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.supportPage}
                    render={() => <SupportPage />}
                  />
                  <Route
                    exact
                    path={ApplicationRoutes.supportPageTutorial}
                    render={() => <SupportPage />}
                  />

                  <Route render={() => <NotfoundPage cookies={cookies} />} />
                </Switch>
              </PageHolder>
            </div>
          </Router>
        </div>
        <WhatsApp />
      </MuiThemeProvider>
    );
  }
}


// Redux connection
const mapStateToProps = state => ({
  user: state.userReducer.user,
  settings: state.settingsReducer,
  savedCars: state.userReducer.savedCars
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(USER_ACTIONS.createUser(user)),
  modifyUser: user => dispatch(USER_ACTIONS.modifyUser(user)),
  removeUser: () => dispatch(USER_ACTIONS.removeUser()),
  setLanguage: lang => dispatch(SETTINGS_ACTIONS.setLanguage(lang)),
  setLanguages: languages => dispatch(SETTINGS_ACTIONS.setLanguages(languages)),
  setMarketLayout: useNew => dispatch(SETTINGS_ACTIONS.changeMarketDesign(useNew)),
  receivePushNotifications: receive => dispatch(SETTINGS_ACTIONS.modifyPushNotifications(receive)),
  fetchSavedCars: () => dispatch(USER_ACTIONS.fetchSavedCars()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withCookies(withAPI(App))));
