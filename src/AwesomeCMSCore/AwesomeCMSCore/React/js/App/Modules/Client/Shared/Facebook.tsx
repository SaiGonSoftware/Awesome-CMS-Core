import React from "react";
const Facebook: React.SFC<{}> = () => {
  return (
    <div className="widget widget-facebook-page-box wow fadeInUp">
      <div className="widget-content">
        <div className="widget-title">
          <h2>Facebook page</h2>
        </div>
        <div className="widget-extra-info-holder">
          <iframe
            src="./Optimistic Blog Index_files/page.html"
            width="300"
            height="500"
            scrolling="no"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};
export default Facebook;
