/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import Select from '@material-ui/core/Select';
import './style.css';
import { Elements, StripeProvider } from 'react-stripe-elements';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { Button } from '@material-ui/core';
import { Upload } from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import USER_ACTIONS from '../../../../modules/user/action';
import AddDeposit from './Components/Modals/AddDeposit';
import { ApiServer, StripeKey } from '../../../../Defaults';
import CreateCard from './Components/Modals/CreateCard';
import ProfileForm from '../../../ProfileForm/ProfileForm';
import DepositProgress from '../../../DepositProgress/DepositProgress';
import UnderLine from '../../../Underline/Underline';
import SubscribeButton from './Components/SubscribeButton';
import AddPhotoIconMui from '@material-ui/icons/AddAPhoto';

const HeadingStyle = styled.div`
  font-size: 1em;
  font-weight: 600;
  line-height: 1.31;
  padding: 20px 40px;
  color: #000000;
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const ActionButtonText = styled.span`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  padding: 16px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgb(0,0,0,0.15);
  border: 1.2px solid #ccc;
`;

const CardHolderLarge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 8px;
  }
`;

const CardNumber = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const CardExpDate = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const CardBrand = styled.div`
  margin: 4px 4px;
  @media only screen and (max-width: 768px) {
    margin: 16px 8px;
  }
`;

const CardActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
    justify-content: center;
    margin-top: 24px;
  }
`;

const ProfilePhotoWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const AddPhotoIcon = styled(AddPhotoIconMui)`
  color: rgb(0, 0, 0, 0.75);
  transition: all 0.1s;
`;

const EditImageWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
  display: ${props => props.editable ? 'block' : 'none'};
  &:hover {
    & > ${AddPhotoIcon} {
      color: rgb(0, 0, 0, 1);
    }
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

async function removeCard(cardToken) {
  await axios.delete(`${ApiServer}/api/v1/user/cards?card_id=${cardToken}`);
  window.location.reload();
}
class SettingSide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      unEditedInfo: {},
      paymentMethods: [],
      cardsNumbers: [],
      card: '',
      loading: false,
      name: '',
      funds: 0,
      profilePhotoUrl: "/images/no-user-photo.png"
    };
  }

  componentDidMount = () => {
    this.paymentMethods();
    this.getUser();
    this.getFunds();
  }

  onEditableClick = () => {
    this.setState(prev => ({ editable: !prev.editable }));
  }

  getDefaultPaymentMethod = async () => {
    const response = await axios.get(`${ApiServer}/api/v1/user/cards/default`);
    this.setState({
      card: response.data,
    });
  }

  getFunds = async () => {
    const responseFunds = (await axios.get(`${ApiServer}/api/v1/user/funds`)).data;
    this.setState({
      funds: responseFunds,
    }, this.generateGraph);
  }

  getUser = () => {
    const { user } = this.props;
    this.setState({
      name: user.name,
      address: user.address,
      email: user.email,
      phone: user.phone,
      profilePhotoUrl: user.photo,
    });
  }

  onDepositSuccess = () => {
    this.getFunds();
  }

  onEditProfileInfo = () => {
    this.setState(
      prevState => (
        {
          editable: !prevState.editable,
          unEditedInfo: {
            name: prevState.name,
            email: prevState.email,
            address: prevState.address,
            phone: prevState.phone,
          },
        }
      ),
    );
  }

  onCancelEditProfile = () => {
    const { unEditedInfo } = this.state;
    this.cleanImage();
    this.setState({
      editable: false,
      unEditedInfo: {},
      name: unEditedInfo.name,
      address: unEditedInfo.address,
      email: unEditedInfo.email,
      phone: unEditedInfo.phone,
    });
  }

  cleanImage = () => {
    if (!!this.currentPhotoUrl) {
      this.setState({
        profilePhotoUrl: this.currentPhotoUrl,
      });
    }
  }

  onSaveEditProfile = () => {
    const {
      name,
      address,
      email,
      phone,
      profilePhotoObj,
    } = this.state;
    const { modifyUserImage } = this.props;

    this.setState({
      editable: false,
    },() => {
      const names = name.split(' ');
      const user = {
        first_name: names[0],
        last_name: names.slice(1, names.length).join(' '),
        email,
        name: `${names[0]} ${names.slice(1, names.length).join(' ')}`,
        phone: phone,
        address,
      };

      if (!!profilePhotoObj) {
        modifyUserImage(profilePhotoObj).then(data => {
          this.updateUser(user, false);
          this.props.openNotification({
            title: 'User info and photo changed',
            description: 'You have succesfully changed your user photo and info.',
            success: true,
          });
          this.setState({
            profilePhotoObj: undefined,
          });
        });
      } else {
        this.updateUser(user, true);
      }
    });
  }

  updateUser = (user, displayNotification) => {
    axios.patch(`${ApiServer}/api/v1/user`, { user }).then(() => {
      this.props.modifyUser(user);
      this.currentPhotoUrl = undefined;
      if (displayNotification) {
        this.props.openNotification({
          title: 'User info was changed',
          description: 'You have modified your personal information succesfully.',
          success: true
        });
      }
    });
  }

  onEditProfileChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  generateGraph = () => {
    const options = {
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const amount = data.datasets[0].data[tooltipItem.index].toFixed(2);
            const amountWithCommas = numberWithCommas(amount);
            const moneyFormattedAmount = `$ ${amountWithCommas} USD`;
            return moneyFormattedAmount;
          },
        },
      },
      scales: {

      },
    };

    const { funds } = this.state;
    const { intl } = this.props;
    const amount = funds;

    const progressPercentage = parseFloat(amount.balance - amount.holding);
    const holdingPercentage = parseFloat(amount.holding);
    const totalPercentage = parseFloat(10000 - progressPercentage - holdingPercentage);

    const data = {
      datasets: [{
        data: [progressPercentage, holdingPercentage, totalPercentage],
        backgroundColor: ['#1D385A', 'rgb(35, 88, 154)', '#3e78c0'],
      }],

      labels: [
        intl.formatMessage({ id: 'label.deposit.remaining' }),
        intl.formatMessage({ id: 'label.deposit.holding' }),
        intl.formatMessage({ id: 'label.deposit.total' }),
      ],
    };

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data,
      options,
    });
  }

  paymentMethods = async () => {
    const methods = [];
    const cardsNumbers = [];

    const response = (await axios.get(`${ApiServer}/api/v1/user/cards`)).data;
    for (let i = 0; i < response.length; i += 1) {
      const card = response[i];

      let brand = null;
      let brandSmall = null;
      switch (card.brand) {
        case 'Visa':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-visa" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-visa" />;
          break;
        case 'American Express':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-amex" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-amex" />;
          break;
        case 'Diners Club':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-diners-club" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-diners-club" />;
          break;
        case 'Discover':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-discover" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-discover" />;
          break;
        case 'JCB':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-jcb" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-jcb" />;
          break;
        case 'MasterCard':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-mastercard" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-mastercard" />;
          break;
        default:
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="far fa-question-circle" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="far fa-question-circle" />;
          break;
      }

      cardsNumbers.push({
        key: card.id,
        value: card.id,
        text: <span style={{ fontSize: '15px' }}>
          {brandSmall}
          {' '}
          {card.last4}
        </span>,
      });

      const view = (
        <CardHolderLarge key={i}>
          <CardBrand>
            {brand}
          </CardBrand>
          <CardNumber>
            XXXX-XXXX-XXXX-
            {card.last4}
          </CardNumber>
          <CardExpDate>
            {card.exp_month}
            {' '}
            /
            {' '}
            {card.exp_year}
          </CardExpDate>

          <CardActionButtons>
            {/* <button className="simple-view">
                <i style={{ color: '#3a7abf', fontSize: '12px' }} className="fas fa-pen" />
                <span style={{ color: '#3a7abf', fontSize: '12px', margin: 0 }}>
                  {'  '}
                  Edit
                </span>
              </button> */}

            <Button
              type="button"
              onClick={(node) => {
                node.target.style.cursor = 'wait';
                removeCard(card.id);
              }}
            >
              <i style={{ color: '#3a7abf', fontSize: '12px', marginRight: '8px' }} className="fas fa-trash-alt" />
              <span style={{ color: '#3a7abf', fontSize: '12px', margin: 0 }}>
                {'  '}
                Delete
              </span>
            </Button>
          </CardActionButtons>
          <hr style={{ margin: 0 }} />
        </CardHolderLarge>
      );
      methods.push(view);
    }

    this.setState({
      paymentMethods: methods,
      cardsNumbers,
    });

    this.getDefaultPaymentMethod();
  }

  handleCardChange = async (e) => {
    this.setState({
      card: e.target.value,
      loading: true,
    });

    axios.patch(`${ApiServer}/api/v1/user/cards/default`, { card_id: e.target.value });
    window.location.reload();
  }

  previewPhoto = (e) => {
    if (!!e && !!e.file) {
      var reader = new FileReader();
    
      reader.onload = (e) => {
        const { profilePhotoUrl } = this.state;

        if (!this.currentPhotoUrl) {
          this.currentPhotoUrl = profilePhotoUrl;
        }

        this.setState({
          profilePhotoUrl: e.target.result,
        });

      }
      this.setState({
        profilePhotoObj: e.file,
      }, () => {
        reader.readAsDataURL(e.file);
      })
    }
  }

  handleImage = (e) => {
    this.previewPhoto(e);
  }

  render() {
    const {
      editable,
      name,
      address,
      email,
      phone,
      card,
      loading,
      funds,
      profilePhotoUrl,
    } = this.state;

    const { isSavingInfo } = this.props;

    return (
      <HeadingStyle>
        <div className="card content-holder-box">
          <UnderLine>
            <h4 className="mb-0">
              <FormattedMessage id="label.deposit" />
            </h4>
          </UnderLine>
          <div className="d-flex content-main flex-modifier-user-view">
            <canvas
              className="phone-only"
              id="myChart"
              width="100"
              height="100"
              style={{
                marginBottom: '20px',
              }}
            />
            <DepositProgress className="tablet-up" amount={funds} />
            <AddDeposit onSuccess={this.onDepositSuccess} cookies={this.props.cookies} />
          </div>
        </div>

        {/* TODO: MOVE THIS TO SETTINGS IN MAIN MENU */}
        <div className="card content-holder-box">
          <UnderLine>
            <h4 className="mb-0">
              <FormattedMessage id="label.notifications" />
            </h4>
          </UnderLine>
          <div className="content-main">
            <FormattedMessage id="label.notification.explanation" />
            <br />
            <br />
            <SubscribeButton />
          </div>
        </div>
        
        <div className="card content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">
              <FormattedMessage id="label.personal-info" />
            </h4>
            <div>
              {
                editable
                  ? (
                    <>
                      <CancelIcon color="primary" style={{}} onClick={this.onCancelEditProfile} />
                      <CheckIcon color="accent" onClick={this.onSaveEditProfile} />
                    </>
                  )
                  : isSavingInfo ? 'Loading....' : (
                    <button
                      type="button"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                      onClick={this.onEditProfileInfo}
                      className="border-0 button_white"
                    >
                      <i style={{ fontSize: '12px', color: '#000000' }} className="fas fa-pen" />
                      {' '}
                      <ActionButtonText>
                        <FormattedMessage id="label.modify-personal-info" />
                      </ActionButtonText>
                    </button>
                  )
              }
            </div>
          </UnderLine>
          <ProfilePhotoWrapper>
            <Upload disabled={!editable} customRequest={this.handleImage} multiple={false} showUploadList={false} accept="png,jpg" >
              <ImageWrapper>
                <ProfileImage id="user-photo" src={!!profilePhotoUrl ? profilePhotoUrl : '/images/no-user-photo.png'} />
                <EditImageWrapper editable={editable}>
                  <AddPhotoIcon type="upload" />
                </EditImageWrapper>
              </ImageWrapper>
            </Upload>
          </ProfilePhotoWrapper>
          <ProfileForm
            editable={editable}
            name={name}
            address={address}
            email={email}
            phone={phone}
            onNameChange={this.onEditProfileChange}
            onAddressChange={this.onEditProfileChange}
            onEmailChange={this.onEditProfileChange}
            onPhoneChange={this.onEditProfileChange}
          />
        </div>

        {/* <PersonalInfo /> */}

        <div className="card content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">
              <FormattedMessage id="label.payment-methods" />
            </h4>
            <StripeProvider apiKey={StripeKey}>
              <Elements>
                <CreateCard cookies={this.props.cookies} />
              </Elements>
            </StripeProvider>
          </UnderLine>
          <div className="content-main">
            <h5><FormattedMessage id="label.cards" /></h5>
            <FormControl style={{ minWidth: '200px', marginBottom: '20px' }}>
              <InputLabel htmlFor="age-simple">
                <FormattedMessage id="label.default-card" />
              </InputLabel>
              <Select
                value={card}
                onChange={this.handleCardChange}
              >
                <MenuItem value="">
                  <em><FormattedMessage id="label.none" /></em>
                </MenuItem>
                {this.state.cardsNumbers.map((cardNumber, i) => (
                  <MenuItem key={i} value={cardNumber.key}>
                    {cardNumber.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <i
                style={{
                  color: '#000000', float: 'rigth', fontSize: '14px', display: loading ? 'inline-block' : 'none',
                }}
                className="fas fa-spinner loading"
              />
            </div>
            <Card style={{ width: '100%' }}>
              {this.state.paymentMethods}
            </Card>
          </div>
        </div>
      </HeadingStyle>
    );
  }
}

// Redux configuration
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  isSavingInfo: state.userReducer.user.isSavingInfo
});
const mapDispatchToProps = (dispatch) => ({
  modifyUser: (user) => dispatch(USER_ACTIONS.modifyUser(user)),
  modifyUserImage: photo => dispatch(USER_ACTIONS.modifyUserImage(photo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SettingSide));
