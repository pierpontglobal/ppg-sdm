import React, { useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";
import {
  RegistrationWrapper,
  ButtonHolders,
  RegistartionWrapper,
  VerifyWrapper,
  Logo,
  Title,
  Subtitle,
  StatusMessage,
  RegistrationForm,
  StepperWrapper,
  MobileStepperCustom
} from "./SignInPage.styles";
import { LightButton } from "../sign-in-page/styles/sign_in_styles";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  ActionCableConsumer,
  ActionCableProvider
} from "react-actioncable-provider";
import ActionCable from "actioncable";
import {
  Elements,
  StripeProvider,
  CardElement,
  injectStripe
} from "react-stripe-elements";
import {
  AccentButton,
  ApiServer,
  CountriesList,
  WSConnection,
  StripeKey
} from "../../../Defaults";
import { TextField, InputAdornment, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import { Icon } from "antd";
import "antd/dist/antd.css";
import "antd/lib/steps/style";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

function validateNameInspector(name, setValidName) {
  if (name.length < 2) {
    setValidName(false);
    return false;
  }
  setValidName(true);
  return true;
}

function validatePhoneInspector(phoneNumber, setValidPhone) {
  let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!phoneNumber.match(phoneno)) {
    setValidPhone(false);
    return false;
  }
  if (phoneNumber.length < 10) {
    setValidPhone(false);
    return false;
  }
  setValidPhone(true);
  return true;
}

function validateEmailInspector(email, setValidEmail) {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    setValidEmail(false);
    return false;
  }
  if (email.length < 4) {
    setValidEmail(false);
    return false;
  }
  setValidEmail(true);
  return true;
}

const UserSection = props => {
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const {
    current,
    setCurrent,
    completeName,
    setCompleteName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail
  } = props;

  return (
    <>
      <RegistrationForm>
        <Logo src="/images/signinpage/ppg_logo.png" />
        <Title>Welcome to PierpontGlobal</Title>
        <Subtitle>Customer Registration</Subtitle>
        <TextField
          error={!validName}
          name="name"
          autoComplete="name"
          id="standard-name"
          label="Complete name"
          margin="normal"
          defaultValue={completeName}
          onChange={node => setCompleteName(node.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="user" />
              </InputAdornment>
            )
          }}
        />
        <TextField
          error={!validPhone}
          name="mobile"
          autoComplete="tel"
          id="standard-phone"
          label="Phone number"
          margin="normal"
          type="tel"
          defaultValue={phoneNumber}
          onChange={node => setPhoneNumber(node.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="phone" />
              </InputAdornment>
            )
          }}
        />
        <TextField
          error={!validEmail}
          name="email"
          autoComplete="email"
          id="standard-email"
          label="E-mail"
          margin="normal"
          type="email"
          defaultValue={email}
          onChange={node => setEmail(node.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="mail" />
              </InputAdornment>
            )
          }}
        />
      </RegistrationForm>
      <ButtonHolders>
        <MediaQuery maxDeviceWidth={769}>
          <MobileStepperCustom
            variant="dots"
            steps={4}
            position="static"
            activeStep={current}
          />

        </MediaQuery>
        <LightButton onClick={() => { props.setPage(1) }}> <Icon type="left" /> Sign in</LightButton>
        <LightButton
          onClick={() => {
            let nameValidator = validateNameInspector(completeName, setValidName);
            let phoneValidator = validatePhoneInspector(phoneNumber, setValidPhone);
            let emailValidator = validateEmailInspector(email, setValidEmail);

            if (current + 1 < 4
              && nameValidator
              && phoneValidator
              && emailValidator) {
              setCurrent(current + 1);
            }
          }}
        >
          Next <Icon type="right" />
        </LightButton>
      </ButtonHolders>
    </>
  );
};

async function sendSubscription(completeName, email, phoneNumber, setCurrent,
  setErrorSnack,
  setShowError) {
  await axios.post(`${ApiServer}/api/v2/users/subscription`, {
    first_name: completeName,
    last_name: "",
    email: email,
    phone_number: phoneNumber
  }).then((data) => { console.log(data) }).catch((error) => {
    setCurrent(0);
    setErrorSnack(error.response.data.status);
    setShowError(true)
  });
}

const VerifySection = props => {
  const {
    current,
    setCurrent,
    verified,
    setVerified,
    completeName,
    email,
    phoneNumber,
    setErrorSnack,
    setShowError
  } = props;
  let cable = null;
  if (!verified) {
    sendSubscription(completeName, email, phoneNumber, setCurrent,
      setErrorSnack,
      setShowError);
    cable = ActionCable.createConsumer(`${WSConnection}?hash=${email}`);
  }
  return (
    <>
      <RegistrationForm>
        <ActionCableProvider cable={cable}>
          <ActionCableConsumer
            channel="VerificationChannel"
            onReceived={message => {
              console.log(message);
              setVerified(message["verified"]);
            }}
          />
        </ActionCableProvider>
        <VerifyWrapper>
          <Title>Verify that it is you</Title>
          <Icon
            style={{ fontSize: "100px", margin: "20px" }}
            type={verified ? "check" : "loading"}
          />
          <Subtitle>
            Check your email and click the verification link before the folowing
            10 minutes, then comeback here to continue your registration process
          </Subtitle>
        </VerifyWrapper>
      </RegistrationForm>
      <ButtonHolders>

        <MediaQuery maxDeviceWidth={769}>
          <MobileStepperCustom
            variant="dots"
            steps={4}
            position="static"
            activeStep={current}
          />

        </MediaQuery>

        <LightButton
          onClick={() => {
            if (current - 1 > -1) {
              setCurrent(current - 1);
            }
          }}
        >
          <Icon type="left" /> Back
          </LightButton>
        <LightButton
          disabled={!verified}
          onClick={() => {
            if (current + 1 < 4) {
              setCurrent(current + 1);
            }
          }}
        >
          Next <Icon type="right" />
        </LightButton>
      </ButtonHolders>
    </>
  );
};

function validateDealerNameInspector(name, setValidName) {
  console.log(name.length)
  if (name.length < 3) {
    setValidName(false);
    return false;
  }
  setValidName(true);
  return true;
}

const DealerSection = props => {

  const [validName, setValidName] = useState(true);
  const [validCountry, setValidCountry] = useState(true);
  const [validCity, setValidCity] = useState(true);
  const [validAddress, setValidAddress] = useState(true);

  const {
    current,
    setCurrent,
    country,
    setCountry,
    dealerName,
    setDealerName,
    city,
    setCity,
    address,
    setAddress
  } = props;
  return (
    <>
      <RegistrationForm>
        <Title>Dealer</Title>
        <Subtitle>Dealer registration</Subtitle>
        <TextField
          error={!validName}
          id="standard-name"
          label="Dealer name"
          margin="normal"
          required
          defaultValue={dealerName}
          onChange={node => setDealerName(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="shop" />
              </InputAdornment>
            )
          }}
        />
        <TextField
          error={!validCountry}
          margin="normal"
          id="standard-select-country"
          required
          select
          label="Country"
          value={country}
          onChange={node => setCountry(node.target.value)}
          SelectProps={{
            name: "country",
            autoComplete: "country",
            MenuProps: {}
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="global" />
              </InputAdornment>
            )
          }}
          helperText="Please select your country" m
        >
          {CountriesList.map(option => (
            <MenuItem key={option.key} value={option.name.en}>
              {option.name.en}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          error={!validCity}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="environment" />
              </InputAdornment>
            )
          }}
          required
          defaultValue={city}
          onChange={node => setCity(node.target.value)}
          label="City"
          name="city"
          autoComplete="address-level2"
        />
        <TextField
          error={!validAddress}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="environment" />
              </InputAdornment>
            )
          }}
          required
          defaultValue={address}
          onChange={node => setAddress(node.target.value)}
          name="address"
          autoComplete="address-line1"
          label="Address"
        />
      </RegistrationForm>
      <ButtonHolders>

        <MediaQuery maxDeviceWidth={769}>
          <MobileStepperCustom
            variant="dots"
            steps={4}
            position="static"
            activeStep={current}
          />

        </MediaQuery>
        <LightButton
          onClick={() => {
            if (current - 1 > -1) {
              setCurrent(current - 1);
            }
          }}
        >
          <Icon type="left" /> Back
          </LightButton>
        <LightButton
          onClick={() => {
            let validatedName = validateDealerNameInspector(dealerName, setValidName);
            let validatedCountry = validateDealerNameInspector(country, setValidCountry);
            let validatedCity = validateDealerNameInspector(city, setValidCity);
            let validatedAddress = validateDealerNameInspector(address, setValidAddress);

            console.log(validatedName);

            if (current + 1 < 4
              && validatedName
              && validatedCountry
              && validatedCity
              && validatedAddress) {
              setCurrent(current + 1);
            }
          }}
        >
          Next <Icon type="right" />
        </LightButton>
      </ButtonHolders>
    </>
  );
};

const SubscriptionSection = injectStripe(props => {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsCorrect, setFieldsCorrect] = useState(true);
  const [couponVerified, setCouponVerified] = useState(undefined);
  const [basePrice, setBasePrice] = useState(495);
  const [cookies, setCookies] = useCookies();
  const [validPassword, setValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    completeName,
    current,
    setCurrent,
    password,
    setPassword,
    coupon,
    setCoupon
  } = props;

  return (
    <>
      <RegistrationForm>
        <TextField
          error={!validPassword}
          id="standard-password"
          label="Password"
          autoComplete="new-password"
          margin="normal"
          required
          type={showPassword ? "text" : "password"}
          defaultValue={password}
          onChange={node => setPassword(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="lock" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Icon type="eye" />
                  ) : (
                      <Icon type="eye-invisible" />
                    )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <p>Password must be 8 characters long, and contain at least one number and one lowercase letter</p>
        <Title>Payment</Title>
        <br />
        <CardElement />
        <br />

        <TextField
          id="standard-coupon"
          label="Coupon"
          autoComplete="off"
          margin="normal"
          defaultValue={coupon}
          onChange={node => setCoupon(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="gift" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <LightButton
                  aria-label="Apply coupon"
                  onClick={() => {
                    setCouponVerified(null);
                    axios.get(`${ApiServer}/api/v1/user/cards/coupon?coupon=${coupon}`).then((response) => {
                      console.log(response);
                      setBasePrice(495 - (response.data.amount_off / 100))
                      setCouponVerified(true);
                    }).catch((error) => {
                      setBasePrice(495)
                      setCouponVerified(false);
                    })
                  }}
                >
                  APPLY
                </LightButton>
                {couponVerified !== undefined ? couponVerified === null ? <Icon type="loading" /> : <Icon type={couponVerified ? "check-circle" : "close-circle"} /> : <></>}
              </InputAdornment>
            )
          }}
        />
        {loading ?
          <Icon
            style={{ fontSize: "60px", marginTop: "20px" }}
            type="loading"
          /> : <></>
        }
        <StatusMessage status={fieldsCorrect}>
          Something went wrong please review payment information
        </StatusMessage>
        <div>
          <AccentButton
            style={{
              marginTop: "40px",
              width: "100%",
              borderRadius: "15px"
            }}
            onClick={async ev => {
              setLoading(true);
              let { token } = await props.stripe.createToken({
                name: completeName
              });
              let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
              let passwordValidation = strongRegex.test(props.password);

              if (token !== undefined && passwordValidation) {
                setValidPassword(true);
                let payload = {
                  coupon: props.coupon,
                  user: {
                    first_name: props.completeName,
                    email: props.email,
                    source: token,
                    phone_number: props.phoneNumber,
                    password: props.password,
                  },
                  dealer: {
                    name: props.dealerName,
                    country: props.country,
                    city: props.city,
                    address1: props.address,
                  }
                }
                axios.post(`${ApiServer}/api/v2/users/signup`, payload).then((response) => {
                  const data = {
                    user: {
                      login: props.email,
                      password: props.password
                    }
                  };
                  axios.post(`${ApiServer}/api/v2/users/login`, data).then(
                    response => {
                      setCookies("token", response.headers['authorization'], {
                        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                      });
                      axios.post(`${ApiServer}/api/v1/user/notifier`, {
                        one_signal_uuid: cookies["one_signal_uuid"]
                      });
                    }
                  );
                }).catch((error) => {
                  setFieldsCorrect(false);
                  setValidPassword(true);
                  setLoading(false);
                });
              } else if (!passwordValidation) {
                setValidPassword(false)
                setLoading(false);
              } else {
                setFieldsCorrect(false);
                setValidPassword(true);
                setLoading(false);
              }
            }}
          >
            <span style={{ fontWeight: 900 }}>
              Pay $ {basePrice.toFixed(2)} USD and sign in
            </span>
          </AccentButton>
        </div>
      </RegistrationForm>

      <ButtonHolders>


        <MediaQuery maxDeviceWidth={769}>
          <MobileStepperCustom
            variant="dots"
            steps={4}
            position="static"
            activeStep={current}
          />

        </MediaQuery>

        <LightButton
          onClick={() => {
            if (current - 1 > -1) {
              setCurrent(current - 1);
            }
          }}
        >
          <Icon type="left" /> Back
          </LightButton>
      </ButtonHolders>
    </>
  );
});

const Section = props => {
  const { current } = props;
  switch (current) {
    case 0:
      return <UserSection {...props} />;
    case 1:
      return <VerifySection {...props} />;
    case 2:
      return <DealerSection {...props} />;
    case 3:
      return (
        <>
          <StripeProvider apiKey={StripeKey}>
            <Elements>
              <SubscriptionSection {...props} />
            </Elements>
          </StripeProvider>
        </>
      );
    default:
      return <UserSection {...props} />;
  }
};

function mobileTitle(index) {
  switch (index) {
    case 1:
      return (
        <>
          <Title>Verify your account</Title>
          <Subtitle>Verify that you are you, check your email!</Subtitle>
        </>
      );
    case 2:
      return (
        <>
          <Title>Dealer information</Title>
          <Subtitle>Tell us about your dealer</Subtitle>
        </>
      );
    case 3:
      return (
        <>
          <Title>Subscription</Title>
          <Subtitle>Process the payment of your subscription</Subtitle>
        </>
      );
    default:
      return (
        <>
          <Title>User information</Title>
          <Subtitle>Provide your basic user information</Subtitle>
        </>
      );
  }
}

function getSteps() {
  return ['User information', 'Verify your account', 'Dealer information', 'Subscription'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Provide your basic user information`;
    case 1:
      return 'Verify that you are you, check your email!';
    case 2:
      return `Tell us about your dealer`;
    case 3:
      return 'Process the payment of your subscription';
    default:
      return 'Unknown step';
  }
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const RegisterView = props => {
  const [current, setCurrent] = useState(0);
  const [completeName, setCompleteName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const [country, setCountry] = useState("Dominican Republic");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [coupon, setCoupon] = useState("");
  const [amountToPay, setAmountToPay] = useState("495.00");
  const [cardToken, setCardToken] = useState("");
  const [errorSnack, setErrorSnack] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    function handleResize() {
      let isMovileView = getWindowDimensions().width <= 768
      window.changeWWPosition(isMovileView ? 'moveToTop' : 'normal');
    }
    window.addEventListener('resize', handleResize);
    window.changeWWPosition(getWindowDimensions().width <= 768 ? 'moveToTop' : 'normal');
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
      window.changeWWPosition('normal');
    };
  });

  const steps = getSteps();

  return (<RegistrationWrapper>

    <MediaQuery minDeviceWidth={769}>
      <StepperWrapper>
        <Stepper activeStep={current} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </StepperWrapper>
    </MediaQuery>
    <RegistartionWrapper>
      <Section
        setErrorSnack={setErrorSnack}
        setShowError={setShowError}
        setPage={props.setPage}
        current={current}
        setCurrent={setCurrent}
        completeName={completeName}
        setCompleteName={setCompleteName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        verified={verified}
        setVerified={setVerified}
        dealerName={dealerName}
        setDealerName={setDealerName}
        country={country}
        setCountry={setCountry}
        city={city}
        setCity={setCity}
        address={address}
        setAddress={setAddress}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        coupon={coupon}
        setCoupon={setCoupon}
        amountToPay={amountToPay}
        setAmountToPay={setAmountToPay}
        cardToken={cardToken}
        setCardToken={setCardToken} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showError}
        autoHideDuration={6000}
        onClose={() => { setShowError(false) }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorSnack}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => { setShowError(false) }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </RegistartionWrapper>
  </RegistrationWrapper >);
};
