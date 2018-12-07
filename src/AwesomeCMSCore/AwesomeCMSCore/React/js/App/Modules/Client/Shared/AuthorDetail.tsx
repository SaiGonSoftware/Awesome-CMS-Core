import React from "react";
const AuthorDetail: React.SFC<{}> = () => {
  return (
    <div className="widget widget-about-me wow fadeInUp">
      <div className="widget-content">
        <div className="widget-about-me-profile">
          <img src="./Optimistic Blog Index_files/profile.jpeg" alt="..." />
        </div>
        <div className="widget-extra-info-holder">
          <div className="widget-author-name">
            <h3>Anuj Subedi</h3>
            <span className="author-profession">Ghost Blogger</span>
          </div>
          <div className="widget-author-bio">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="widget-author-social">
            <ul className="social-links">
              <li>
                <a href="https://facebook.com/" />
              </li>
              <li>
                <a href="https://twitter.com/" />
              </li>
              <li>
                <a href="https://instagram.com/" />
              </li>
              <li>
                <a href="https://youtube.com/" />
              </li>
              <li>
                <a href="https://snapchat.com/" />
              </li>
            </ul>
          </div>
          <div className="widget-author-signature">
            <img
              src="./Optimistic Blog Index_files/signature-one.jpg"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthorDetail;
