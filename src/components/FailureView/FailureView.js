import React from "react";

import "./failureView.css";

const FailureView = ({ retryFetch }) => {
  return (
    <div className="failure-bg-container">
      <h1 className="h1">Something went wrong! TryAgain</h1>
      <button className="retry-button" onClick={retryFetch}>
        Retry
      </button>
    </div>
  );
};

export default FailureView;
