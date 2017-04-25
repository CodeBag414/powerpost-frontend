import React, { PropTypes } from 'react';

import Button from 'elements/atm.Button';
import CardWrapper from '../CardWrapper';

const PaymentCard = ({ editPayment }) => (
  <CardWrapper style={{ marginTop: '20px' }}>
    <div className="title-label">
      Payment
    </div>
    <div className="title">
      Information
    </div>
    <div className="divider" />
    {
      <div>
        <section>
          <div className="header">Name</div>
          <div className="value">Person's Name</div>
        </section>
        <section>
          <div className="header">Visa</div>
          <div className="value">********4743</div>
        </section>
        <section>
          <div className="header">Expires</div>
          <div className="value">10/14/12</div>
        </section>
      </div>
    }

    <Button onClick={editPayment}>
      Edit Info
    </Button>
  </CardWrapper>
);

PaymentCard.propTypes = {
  editPayment: PropTypes.func,
};

export default PaymentCard;
