import React from "react";
import BG1 from "../../../images/img/banner/thumb/1.png";
import SM1 from "../../../images/img/banner/small-banner/1-1.png";
import SM2 from "../../../images/img/banner/small-banner/1-2.png";
import SM3 from "../../../images/img/banner/small-banner/1-3.png";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <>
      <div className="banner-fullwidth-area">
        <div className="container custom-wrapper">
          <div className="row">
            <div className="col-md-5 col-lg-6 text-center col-custom">
              <div className="banner-thumb h-100 d-flex justify-content-center align-items-center">
                <img src={BG1} alt="Banner Thumb" />
              </div>
            </div>
            <div className="col-md-7 col-lg-6 text-center justify-content-center col-custom">
              <div className="banner-flash-content d-flex flex-column align-items-center justify-content-center h-100">
                <h2 className="deal-head text-uppercase">Flash Deals</h2>
                <h3 className="deal-title text-uppercase">
                  Hurry up and Get 25% Discount
                </h3>
                <Link className="obrien-button black-btn" to="/shop">
                  Shop Now
                </Link>
                <div
                  className="countdown-wrapper d-flex justify-content-center"
                  data-countdown="2022/12/24"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-area">
        <div className="container container-default custom-area">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-custom">
              <div className="banner-image hover-style">
                <Link to="/shop">
                  <img className="w-100" src={SM1} alt="Banner-1" />
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-custom">
              <div className="banner-image hover-style">
                <Link to="/shop">
                  <img className="w-100" src={SM2} alt="Banner-2" />
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-custom">
              <div className="banner-image hover-style mb-0">
                <Link to="/shop">
                  <img className="w-100" src={SM3} alt="Banner-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
