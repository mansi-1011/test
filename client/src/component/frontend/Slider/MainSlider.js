import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function MainSlider() {
  const Settings = {
    fade: true,
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    pauseOnFocus: false,
    speed: 500,
    lazyLoad: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="slider-area">
      <Slider className="obrien-slider arrow-style" {...Settings}>
        <div className="slide-item slide-1 bg-position slide-bg-1 animation-style-01">
          <div className="slider-content">
            <h4 className="slider-small-title">Cold processed organic fruit</h4>
            <h2 className="slider-large-title">Fresh Avocado</h2>
            <div className="slider-btn">
              {/* <button className="obrien-button black-btn" href="shop.html">
                Shop Now
              </button> */}
              <Link className="obrien-button black-btn" to="/shop">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="slide-item slide-2 bg-position slide-bg-1 animation-style-01">
          <div className="slider-content">
            <h4 className="slider-small-title">Healthy life with</h4>
            <h2 className="slider-large-title">Natural Organic</h2>
            <div className="slider-btn">
              <Link className="obrien-button black-btn" to="/shop">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="slide-item slide-3 bg-position slide-bg-1 animation-style-01">
          <div className="slider-content">
            <h4 className="slider-small-title">Organic Products</h4>
            <h2 className="slider-large-title">Life with Beauty</h2>
            <div className="slider-btn">
              <Link className="obrien-button black-btn" to="/shop">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="slide-item slide-4 bg-position slide-bg-1 animation-style-01">
          <div className="slider-content">
            <h4 className="slider-small-title">Cold process organic</h4>
            <h2 className="slider-large-title">Superior skin care</h2>
            <div className="slider-btn">
              <Link className="obrien-button black-btn" to="/shop">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
