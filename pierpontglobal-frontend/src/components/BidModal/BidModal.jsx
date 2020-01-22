import React from 'react';
import Modal from "../Modal/Modal";
import Information from './Information/Information';
import Container from '../styles/Container/Container';
import Btn from '../Btn/Btn';
import { FormattedMessage } from 'react-intl';

const thanksForBidLabel = <FormattedMessage id="bid.thanks-for-bid" />;
const estimatedTotalLabel = <FormattedMessage id="bid.estimated-total" />;
const unitCostLabel = <FormattedMessage id="label.unit-cost" />;
const taxesLabel = <FormattedMessage id="label.taxes" />;
const shippingLabel = <FormattedMessage id="label.shipping" />;
const feeLabel = <FormattedMessage id="label.fee" />;
const processingLabel = <FormattedMessage id="label.processing" />;
const transportLabel = <FormattedMessage id="label.thanks-for-bid" />;
const requiredDepositLabel = <FormattedMessage id="label.required-deposit" />;
const changeBidLabel = <FormattedMessage id="label.change-bid" />;
const confirmLabel = <FormattedMessage id="label.confirm" />;

function BidModal({ show, invoice }) {
  return (
    <Modal
      title={thanksForBidLabel}
      show={show}
    >
      <Information
        label={estimatedTotalLabel}
        text={invoice.estimatedTotal}
        fontSize="1em"
        fontWeight={600}
        lineHeight={2.29}
        className="mb-1"
      />
      <Information
        label={unitCostLabel}
        text={invoice.unitCost}
        fontSize="0.875em"
        fontWeight="normal"
        lineHeight={2.29}
        className="mb-0 pb-1 border-bottom"
      />
      <Information
        label={taxesLabel}
        text={invoice.taxes}
        fontSize="0.875em"
        fontWeight="normal"
        lineHeight={2}
        className="mb-0 mt-2"
      />
      <Information
        label={shippingLabel}
        text={invoice.shipping}
        fontSize="0.875em"
        fontWeight="normal"
        lineHeight={2}
        className="mb-0"
      />
      <Information
        label={feeLabel}
        text={invoice.fee}
        fontSize="0.875em"
        fontWeight="normal"
        lineHeight={2}
        className="mb-0"
      />
      <Information
        label={processingLabel}
        text={invoice.proccessing}
        fontSize="0.875em"
        fontWeight="normal"
        lineHeight={2}
        className="mb-0"
      />
      <Information
        label={transportLabel}
        text={invoice.shipping}
        fontSize="0.875em"
        fontWeight="normal"
        lineHeight={2}
        className="mb-0 pb-1 border-bottom"
      />
      <Information
        label={requiredDepositLabel}
        text={invoice.requiredDeposit}
        fontSize="0.875em"
        fontWeight={600}
        lineHeight={2.29}
        className="pt-1"
      />
      <Container
        className="d-flex flex-row justify-content-center"
        height="60px"
      >
        <Btn
          className="flex-fill mr-3"
          color="#3c79c0"
          hoverColor="#4c87cc"
        >
            {changeBidLabel}
        </Btn>
        <Btn
          className="flex-fill px-3"
          color="#0bb761"
          hoverColor="#23d17a"
        >
            {confirmLabel}
        </Btn>
      </Container>
    </Modal>
  );
}

export default BidModal;
