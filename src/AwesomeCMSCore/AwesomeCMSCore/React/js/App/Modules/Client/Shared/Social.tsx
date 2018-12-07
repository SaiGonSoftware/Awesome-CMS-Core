import React from "react";

const Social: React.SFC<{}> = () => {
  return (
    <div className="widget widget-social-links wow fadeInUp">
      <div className="widget-content">
        <div className="widget-title">
          <h2>IM social</h2>
        </div>
        <div className="widget-extra-info-holder">
          <div className="widget-social-links">
            <ul className="social-links-list">
              <li className="facebook-link">
                <a
                  href="http://facebook.com/"
                  className="clearfix"
                  rel="noopener"
                >
                  Facebook
                  <span className="social-icon">
                    <i className="fa fa-facebook" />
                  </span>
                </a>
              </li>
              <li className="twitter-link">
                <a
                  href="http://twitter.com/"
                  className="clearfix"
                  rel="noopener"
                >
                  Twitter
                  <span className="social-icon">
                    <i className="fa fa-twitter" />
                  </span>
                </a>
              </li>
              <li className="googleplus-link">
                <a
                  href="http://plus.google.com/"
                  className="clearfix"
                  rel="noopener"
                >
                  Google Plus
                  <span className="social-icon">
                    <i className="fa fa-google-plus" />
                  </span>
                </a>
              </li>
              <li className="instagram-link">
                <a
                  href="http://instagram.com/"
                  className="clearfix"
                  rel="noopener"
                >
                  Instagram
                  <span className="social-icon">
                    <i className="fa fa-instagram" />
                  </span>
                </a>
              </li>
              <li className="linkedin-link">
                <a
                  href="http://linkedin.com/"
                  className="clearfix"
                  rel="noopener"
                >
                  Linked In
                  <span className="social-icon">
                    <i className="fa fa-linkedin" />
                  </span>
                </a>
              </li>
              <li className="youtube-link">
                <a
                  href="http://youtube.com/"
                  className="clearfix"
                  rel="noopener"
                >
                  Youtube
                  <span className="social-icon">
                    <i className="fa fa-youtube" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
