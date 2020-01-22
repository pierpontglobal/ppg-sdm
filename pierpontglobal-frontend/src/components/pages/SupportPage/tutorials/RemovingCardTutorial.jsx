import React from 'react';
import { FormattedMessage } from 'react-intl';

const RemovingCardTutorial = () => (
  <div>
    <FormattedMessage id="support.basics.remove-card.to-remove-card-click" />
    {' '}
    <b>
      <FormattedMessage id="support.basics.remove-card.delete" />
    </b>
    {' '}
    <FormattedMessage id="support.basics.remove-card.text" />
  </div>
);

export default RemovingCardTutorial;
