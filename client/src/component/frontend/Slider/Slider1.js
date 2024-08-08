import React from "react";
import Slider from "react-slick";
import env from "../../../env.json";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Slider1() {
  const category = useSelector((state) => state.product.category);
  

  const SliderSetting = {
    slidesToShow: 4,
    autoplaySpeed: 5000,
    speed: 500,
    autoplay: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-area">
      <div className="container container-default custom-area">
        <div className="row">
          <div className="col-lg-5 m-auto text-center col-custom">
            <div className="section-content">
              <h2 className="title-1 text-uppercase">Best Sale</h2>
              <div className="desc-content">
                <p>
                  All best seller product are now available for you and your can
                  buy this product from here any time any where so sop now
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 product-wrapper col-custom">
            <Slider className="product-slider" {...SliderSetting}>
              {category?.map((item, i) => {
                return (
                  <div key={`product-item${i}`} className="single-item">
                    <div className="single-product position-relative">
                      <div className="product-image">
                        {/* <Link to={`/product/${item.category_name}`}> */}
                          <img
                            src={env.API_URL + "/" + item.images.path}
                            alt={item.category_name}
                            className="product-image-2"
                            width={200}
                            height={200}
                          />
                        {/* </Link> */}
                      </div>
                      <div className="product-content">
                        <div className="product-rating"></div>
                        <div className="product-title">
                          <h4 className="title-2">
                            <Link to={`/product/${item.category_name}`}>
                              {item.category_name}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
