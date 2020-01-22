import React from "react";
import { Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import PlanLogo from "./images/Logo4aWhite.png";

function SubscriptionCard({ planName, endDate, value = "" }) {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "10px",
        backgroundColor: "rgb(59, 68, 75)",
        color: "white"
      }}
      className="shadow"
    >
      <div className="card-container">
        <div className="subscription-logo">
          <img alt="Plan logo" className="plan-logo" src={PlanLogo} />
        </div>
        <div className="subscription-details">
          <h2 style={{ fontWeight: "200", color: "white" }}>{planName}</h2>
          <h6>{value}</h6>
          <h6
            style={{
              color: "white"
            }}
          >
            Valid until: {endDate}
          </h6>
        </div>
      </div>
    </Card>
  );
}

SubscriptionCard.propTypes = {
  planName: PropTypes.any,
  endDate: PropTypes.any,
  value: PropTypes.any
};

SubscriptionCard.defaultProps = {
  planName: "",
  endDate: "",
  value: ""
};

export default SubscriptionCard;
