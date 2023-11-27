import React from "react";

import "./hostelLoader.css";

const HostelDetailsLoader = () => {
  return (
    <div className="hostel-loader-bg-container">
      <div className="image-loading pulse-loading"></div>
      <div className="h1-loading pulse-loading">{/* h1 */}</div>
      <div className="h2-loading pulse-loading">{/* address h2 */}</div>
      <div className="address-div-loading pulse-loading">
        {/* address container  */}
      </div>
      <div className="h2-loading pulse-loading">{/* address h2 */}</div>
      <div className="address-div-loading pulse-loading">
        {/* address container  */}
      </div>
      <div className="h2-loading pulse-loading">{/* address h2 */}</div>
      <div className="address-div-loading pulse-loading">
        {/* address container  */}
      </div>
      <div className="h2-loading pulse-loading">{/* address h2 */}</div>
      <div className="address-div-loading pulse-loading">
        {/* address container  */}
      </div>
    </div>
  );
};

export default HostelDetailsLoader;
