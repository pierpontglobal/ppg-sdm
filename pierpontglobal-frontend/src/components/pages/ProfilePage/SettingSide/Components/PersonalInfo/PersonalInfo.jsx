import React from 'react';
import styled from 'styled-components';
import AddPhotoIconMui from '@material-ui/icons/AddAPhoto';

const BoxWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template: 
    "titleBar titleBar titleBar titleBar"
    ". photo photo ."
    ". info info .";

  padding: 16px;
  margin-bottom: 24px;
`;

const TitleBar = styled.div`
  grid-area: titleBar;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  
`;

const ButtonActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ProfilePhoto = styled.div`
  grid-area: photo;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoWrapper = styled.div`
  position: relative;
`;

const EditableInfo = styled.div`
  grid-area: info;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Photo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditPhotoWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const NameWrapper = styled.div`
  padding: 16px;
`;

const OtherInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KeyValuePair = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
`;

// Icons
const AddPhotoIcon = styled(AddPhotoIconMui)`
  color: rgb(0, 0, 0, 0.85);
`;

class PersonalInfo extends React.Component {
  render() {
    return (
      <BoxWrapper>
        <TitleBar>
          <Title>Personal info</Title>
          <ButtonActions>
            button actions here...
          </ButtonActions>
        </TitleBar>
        <ProfilePhoto>
          <PhotoWrapper>
            <Photo src="/images/no-user-photo.png" />
            <EditPhotoWrapper>
              <AddPhotoIcon />
            </EditPhotoWrapper>
          </PhotoWrapper>
        </ProfilePhoto>
        <EditableInfo>
          <NameWrapper>
            <span>Daniel Pena</span>
          </NameWrapper>
          <OtherInfo>
            <KeyValuePair>
              <h4>Key</h4>
              <input value="value" type="text" readOnly />
            </KeyValuePair>
            <KeyValuePair>
              <h4>Key</h4>
              <input value="value" type="text" readOnly />
            </KeyValuePair>
          </OtherInfo>
          <OtherInfo>
            <KeyValuePair>
              <h4>Key</h4>
              <input value="value" type="text" readOnly />
            </KeyValuePair>
          </OtherInfo>
        </EditableInfo>
      </BoxWrapper>
    );
  }
}

export default PersonalInfo;
