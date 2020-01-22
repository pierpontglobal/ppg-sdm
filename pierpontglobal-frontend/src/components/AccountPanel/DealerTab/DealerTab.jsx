import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Building from './building.svg';
import AddPhotoIconMui from '@material-ui/icons/AddAPhoto';
import { Upload } from 'antd';
import USER_ACTIONS from '../../../modules/user/action';

const TabBottom = styled.div`
  content: '';
  width: 0;
  height: 0;
  border-left: 180px solid transparent;
  border-right: 120px solid transparent;
  border-top: 30px solid #eeeeee;
  clear: both;
  margin-bottom: 16px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 8px;
  display: grid;
  background-color: #eeeeee;
  margin-top: 16px;
  grid-template-rows: 3fr 1fr 1fr 1fr;
  grid-template-columns: auto;
  grid-template: 
    "header"
    "title"
    "email"
    "phone";
`;

const HeaderWrapper = styled.div`
  grid-area: header;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  grid-area: title;
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-weight: 400;
    font-size: 1.1rem;
  }
`;

const EmailWrapper = styled.div`
  grid-area: email;
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-weight: 200;
    font-size: 0.90rem;
    color: blue;
  }
`;

const PhoneWrapper = styled.div`
  grid-area: phone;
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-weight: 200;
    font-size: 0.90rem;
  }
`;

const PhotoWrapper = styled.div`
  padding: 4px;
  position: relative;
`;

const AddPhotoIcon = styled(AddPhotoIconMui)`
  color: #6c757d;
  transition: all 0.1s;
`;

const EditPhoto = styled.div`
  position: absolute;
  bottom: -8px;
  right: -8px;
  cursor: pointer;
  &:hover {
    & > ${AddPhotoIcon} {
      color: rgb(0, 0, 0, 0.2);
    }
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  filter: drop-shadow(0 0 8px rgb(0, 0, 0, 0.1));
`;

class DealerTab extends React.Component {

  componentWillMount = () => {
    this.setState({
      logoUrl: this.props.dealer.logo || Building
    });
  }

  previewPhoto = (e) => {
    if (!!e && !!e.file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        const { logoUrl } = this.state;
        if (!this.currentLogoUrl) {
          this.currentLogoUrl = logoUrl;
        }
        this.setState({
          logoUrl: e.target.result,
        });
      }

      reader.readAsDataURL(e.file);
    }
  }

  handleImage = (e) => {
    // Preview photo
    this.previewPhoto(e);
    this.changeLogo(e.file);
    console.log(e);
  }

  changeLogo = (logo) => {
    const { updateDealerLogo } = this.props;
    updateDealerLogo(logo).then((newLogoUrl) => {
      console.log('After changing logo >>>>>>');
      console.log(newLogoUrl);
      this.cleanLogo();
      this.props.openNotification({
        title: 'Delaer logo was changed',
        description: 'You have succesfully changed your dealer logo',
        success: true
      });
    })
  }

  cleanLogo = () => {
    if (!!this.currentLogoUrl) {
      this.currentLogoUrl = undefined;
    }
  }

  render() {
    const { dealer, user } = this.props;
    const { logoUrl } = this.state;

    return (
      <>
        <Wrapper>
          <HeaderWrapper>
            <Upload customRequest={this.handleImage} multiple={false} showUploadList={false} accept="png,jpg" >
              <PhotoWrapper>
                <Logo src={logoUrl} alt={dealer.name ? dealer.name : 'Pierpont Global | client'} />
                <EditPhoto>
                  <AddPhotoIcon type="upload" />
                </EditPhoto>
              </PhotoWrapper>
            </Upload>
          </HeaderWrapper>
          <TitleWrapper>
            <span>
              {dealer.name ? dealer.name : ''}
            </span>
          </TitleWrapper>
          <EmailWrapper>
            <span>
              {user.email ? user.email : ''}
            </span>
          </EmailWrapper>
          <PhoneWrapper>
            <span>
              {dealer.phone ? dealer.phone : ''}
            </span>
          </PhoneWrapper>
        </Wrapper>
        <TabBottom />
      </>
    );
  }
}

// Redux configuration
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  dealer: state.userReducer.user.dealer,
});

const mapDispatchToProps = (dispatch) => ({
  updateDealerLogo: (logo) => dispatch(USER_ACTIONS.updateDealerLogo(logo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerTab);
