/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SignUpTutorial from './SignUpTutorial';
import CreateDealerTutorial from './CreateDealerTutorial';
import AddingCardTutorial from './AddingCardTutorial';
import RemovingCardTutorial from './RemovingCardTutorial';
import PushNotificationTutorial from './PushNotificationTutorial';
import SubscribeTutorial from './SubscribeTutorial';
import { PlaceBidTutorial, PlaceBidVideo } from './PlaceBidTutorial';

const tutorials = ([
  {
    id: 1,
    category: <FormattedMessage id="support.basics" />,
    title: <FormattedMessage id="support.how-to-sign-up" />,
    body: [
      {
        heading: <FormattedMessage id="support.sign-up-process" />,
        content: <SignUpTutorial />,
      },
    ],
  },
  {
    id: 2,
    category: <FormattedMessage id="support.basics" />,
    title: <FormattedMessage id="support.creating-a-dealer" />,
    // video: {
    //   url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    //   sample: 'https://via.placeholder.com/550',
    // },
    body: [
      {
        heading: <FormattedMessage id="support.steps-to-register-a-dealer" />,
        content: <CreateDealerTutorial />,
      },
    ],
  },
  {
    id: 3,
    category: <FormattedMessage id="support.basics" />,
    title: <FormattedMessage id="support.adding-removing-cards" />,
    body: [
      {
        heading: <FormattedMessage id="support.adding-a-card" />,
        content: <AddingCardTutorial />,
      },
      {
        heading: <FormattedMessage id="support.removing-a-card" />,
        content: <RemovingCardTutorial />,
      },
    ],
  },
  {
    id: 4,
    category: <FormattedMessage id="support.basics" />,
    title: <FormattedMessage id="support.push-notifications" />,
    body: [
      {
        heading: <FormattedMessage id="support.what-is-it" />,
        content: <PushNotificationTutorial />,
      },
      {
        heading: <FormattedMessage id="support.subscribe-unsubscribe" />,
        content: <SubscribeTutorial />,
      },
    ],
  },
  {
    id: 5,
    category: <FormattedMessage id="support.bids" />,
    title: <FormattedMessage id="support.place-a-bid" />,
    video: {
      youtube: true,
      iframe: <PlaceBidVideo />,
    },
    body: [
      {
        heading: <FormattedMessage id="support.how-to-place-a-bid" />,
        content: <PlaceBidTutorial />,
      },
    ],
  },
  {
    id: 7,
    category: <FormattedMessage id="support.faqs" />,
    title: <FormattedMessage id="support.view-faqs" />,
    body: [
      {
        heading: <FormattedMessage id="support.faqs.question-1-title" />,
        content: <FormattedMessage id="support.faqs.question-1-response" />,
      },
      {
        heading: <FormattedMessage id="support.faqs.question-2-title" />,
        content: <FormattedMessage id="support.faqs.question-2-response" />,
      },
      {
        heading: <FormattedMessage id="support.faqs.question-3-title" />,
        content: <FormattedMessage id="support.faqs.question-3-response" />,
      },
      {
        heading: <FormattedMessage id="support.faqs.question-4-title" />,
        content: <FormattedMessage id="support.faqs.question-4-response" />,
      },
      {
        heading: <FormattedMessage id="support.faqs.question-5-title" />,
        content: <FormattedMessage id="support.faqs.question-5-response" />,
      },
      {
        heading: <FormattedMessage id="support.faqs.question-6-title" />,
        content: <FormattedMessage id="support.faqs.question-6-response" />,
      },
      {
        heading: <FormattedMessage id="support.faqs.question-7-title" />,
        content: <FormattedMessage id="support.faqs.question-7-response" />,
      },
    ],
  },
]);

export default tutorials;
