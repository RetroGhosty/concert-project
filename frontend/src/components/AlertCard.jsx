import React from "react";

const AlertCard = ({ alertHeader, alertMessage }) => {
  return (
    <div className={alertHeader} role="alert">
      {alertMessage}
    </div>
  );
};

export default AlertCard;
