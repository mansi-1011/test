import React from "react";

export default function OfferBlog() {
  return (
    <div className="newsletter-area">
      <div className="container container-default h-100 custom-area">
        <div className="row h-100">
          <div className="col-lg-8 col-xl-5 offset-xl-6 offset-lg-3 col-custom">
            <div className="newsletter-content text-center d-flex flex-column align-items-center justify-content-center h-100">
              <div className="section-content">
                <h4 className="title-4 text-uppercase">
                  Special <span>Offer</span> for subscription
                </h4>
                <h2 className="title-3 text-uppercase">
                  Get instant discount for membership
                </h2>
                <p className="desc-content">
                  Subscribe our newsletter and all latest news of our <br />
                  latest product, promotion and offers
                </p>
              </div>
              <div className="newsletter-form-wrap ml-auto mr-auto">
                <form id="mc-form" className="mc-form d-flex position-relative">
                  <input
                    type="email"
                    id="mc-email"
                    className="form-control email-box"
                    placeholder="email@example.com"
                    name="EMAIL"
                  />
                  <button
                    id="mc-submit"
                    className="btn primary-btn obrien-button newsletter-btn position-absolute"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
                <div className="mailchimp-alerts text-centre">
                  <div className="mailchimp-submitting"></div>
                  <div className="mailchimp-success text-success"></div>
                  <div className="mailchimp-error text-danger"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
