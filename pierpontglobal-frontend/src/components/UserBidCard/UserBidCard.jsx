import React from 'react';
import { FormattedMessage } from 'react-intl';
import Btn from '../Btn/Btn';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function UserBidCard({ bid }) {
  return (
    <Container
      className="d-flex flex-row justify-content-between p-3"
      maxHeight="105px"
      backgroundColor="#fafafa"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
    >
      <div className="d-flex flex-column" style={{ justifyContent: 'space-between' }}>
        <Text
          className="d-flex mb-3 mb-sm-0"
          fontSize="0.75em"
          fontWeight={600}
          lineHeight={1.33}
          fontColor="#10b364"
        >
          <FormattedMessage id="label.your-bid" />
        </Text>
        <Text
          className="mb-0"
          fontSize="1.65em"
          fontWeight="400"
          lineHeight={1.33}
        >
          {`$${numberWithCommas(bid.toFixed(2))}`}
        </Text>
      </div>
      <Btn
        className="w-100"
        color="#3c79c0"
        hoverColor="#4c87cc"
        maxWidth="260px"
        onClick={() => { window.location.href = '/user/purchase'; }}
      >
        <FormattedMessage id="label.view-open-bids" />
      </Btn>
    </Container>
  );
}

export default UserBidCard;
