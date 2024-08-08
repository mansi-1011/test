import React from "react";
import Slider from "react-slick";
import env from "../../../env.json";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { setCartProduct } from "../../../redux/slices/ProductsSlice";

export default function Slider2() {
  const product = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(setCartProduct(item));
  };
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
  const Slider3Setting = {
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
  };
  return (
    <>
      <div className="product-area">
        <div className="container container-default custom-area">
          <div className="row">
            <div className="col-lg-5 m-auto text-center col-custom">
              <div className="section-content">
                <h2 className="title-1 text-uppercase">Featured Products</h2>
                <div className="desc-content">
                  <p>
                    All best seller product are now available for you and your
                    can buy this product from here any time any where so sop now
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="product-wrapper col-lg-12 col-custom">
              <Slider className="product-slider" {...SliderSetting}>
                {product
                  .slice(0)
                  .reverse()
                  .map((item, _) => {
                    return (
                      <React.Fragment key={`p-${item._id}`}>
                        <div className="single-item">
                          <div className="single-product position-relative mb-30">
                            <Slider className="" {...Slider3Setting}>
                              {item.product_images.map((img, i) => {
                                return (
                                  <div key={i} className="product-image">
                                    {/* <Link to={`/product-details/${item.slug_name}`}> */}
                                    <img
                                      src={`${env.API_URL + "/" + img.path}`}
                                      alt={item.product_name}
                                      className="product-image-1"
                                      // width={400}
                                      // height={450}
                                    />
                                    {/* </Link> */}
                                  </div>
                                );
                              })}
                            </Slider>
                            <div className="product-content">
                              <div className="product-rating"></div>
                              <div className="product-title">
                                <h4 className="title-2">
                                  <Link
                                    className="d-block"
                                    to={`/product-details/${item.slug_name}`}
                                  >
                                    {item.product_name}
                                  </Link>
                                </h4>
                              </div>
                              <div className="price-box">
                                <span className="regular-price ">
                                  ${item.price}.00
                                </span>
                              </div>
                            </div>
                            <div className="add-action d-flex position-absolute">
                              <button
                                title="Add To cart"
                                width={20}
                                onClick={(e) => addToCart(item, e)}
                              >
                                <FontAwesomeIcon icon={faBagShopping} />
                              </button>
                              <button
                                href="wishlist.html"
                                title="Add To Wishlist"
                                width={20}
                              >
                                <FontAwesomeIcon icon={faHeart} />
                              </button>
                              <button
                                onClick={() =>
                                  navigate(`/product-details/${item.slug_name}`)
                                }
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </Slider>

              <Slider className="product-slider" {...SliderSetting}>
                {product.map((item, _) => {
                  return (
                    <React.Fragment key={`item-${item._id}`}>
                      <div className="single-item">
                        <div className="single-product position-relative mb-30">
                          <Slider className="" {...Slider3Setting}>
                            {item.product_images.map((img, i) => {
                              return (
                                <div key={i} className="product-image">
                                  {/* <Link to={`/product-details/${item.slug_name}`}> */}
                                  <img
                                    src={`${env.API_URL + "/" + img.path}`}
                                    alt={item.product_name}
                                    className="product-image-1"
                                    // width={400}
                                    // height={450}
                                  />
                                  {/* </Link> */}
                                </div>
                              );
                            })}
                          </Slider>
                          <div className="product-content">
                            <div className="product-rating"></div>
                            <div className="product-title">
                              <h4 className="title-2">
                                <Link
                                  className="d-block"
                                  to={`/product-details/${item.slug_name}`}
                                >
                                  {item.product_name}
                                </Link>
                              </h4>
                            </div>
                            <div className="price-box">
                              <span className="regular-price ">
                                ${item.price}.00
                              </span>
                            </div>
                          </div>
                          <div className="add-action d-flex position-absolute">
                            <button
                              title="Add To cart"
                              width={20}
                              onClick={(e) => addToCart(item)}
                            >
                              <FontAwesomeIcon icon={faBagShopping} />
                            </button>
                            <button
                              href="wishlist.html"
                              title="Add To Wishlist"
                              width={20}
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/product-details/${item.slug_name}`)
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
