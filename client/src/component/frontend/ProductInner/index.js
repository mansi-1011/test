import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faBagShopping,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";

import env from "../../../env.json";

export default function ProductInner({
  datas,
  categories,
  addToCart,
  subcategory,
  slug_name,
  ...props
}) {
  // console.log(datas, "fyhd");
  const navigate = useNavigate();
  // const [page, setPage] = useState(0);
  // const shopProductPerPage = 6;
  // useEffect(() => {
  //   const numberOfProductsVistited = page * shopProductPerPage;
  //   const displayProduct =
  //     datas && datas?.length
  //       ? datas.slice(
  //           numberOfProductsVistited,
  //           numberOfProductsVistited + shopProductPerPage
  //         )
  //       : "";
  //       console.log(displayProduct ,"fghfkj");
  //   // const changePage = ({ selected }) => {
  //   //   setPage(selected);
  //   // };
  //   // const totalPages = Math.ceil(datas / shopProductPerPage);
  //   return displayProduct;
  // });

  const SliderSetting = {
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
    <div className="container container-default custom-area">
      <div className="row flex-row-reverse">
        <div className="col-lg-9 col-12 col-custom widget-mt">
          <div className="sub-title col-lg-8">
            {/* {title ? (
                                    <h4 className="titles"> {title} </h4>
                                ) : ( */}
            <h4 className="titles">{slug_name}</h4>
            {/* )} */}
          </div>
          <div className="row shop_wrapper grid_3">
            {datas && datas.length ? (
              datas.map((item, i) => (
                <div
                  key={`shop-${i}`}
                  className="col-md-6 col-sm-6 col-lg-4 col-custom product-area"
                >
                  <div className="single-product position-relative">
                      <Slider {...SliderSetting}>
                        {item.product_images.map((img, i) => {
                          return (
                            <div key={i} className="product-image">
                              {/* <Link to={`/product-details/${item.slug_name}`}> */}
                              <img
                                src={`${env.API_URL + "/" + img.path}`}
                                alt={item.product_name}
                                className="product-image-3"
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
                          <Link to={`/product-details/${item.slug_name}`}>
                            {item.product_name}
                          </Link>
                        </h4>
                      </div>
                      <div className="price-box">
                        <span className="regular-price">${item.price}.00</span>
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
              ))
            ) : (
              <div className="row shop_wrapper grid_4">
                <div className="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
                  <div className="single-product position-relative">
                    <p className="alert alert-success"> No Have Products </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="row">
            <div className="col-sm-12 col-custom">
              <div className="toolbar-bottom mt-30">
                <ReactPaginate
                  previousLabel={<FontAwesomeIcon icon={faArrowLeftLong} />}
                  nextLabel={<FontAwesomeIcon icon={faArrowRightLong} />}
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={1}
                  onPageChange={changePage}
                  containerClassName="pagination justify-content-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  pageCount={totalPages}
                  hrefAllControls
                  // forcePage={1}
                />
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-lg-3 col-12 col-custom">
          <aside className="sidebar_widget widget-mt">
            <div className="widget_inner">
              <div className="widget-list widget-mb-2">
                <h3 className="widget-title">SubCategories</h3>
                <div className="search-box">
                  <div className="input-group">
                    <div className="widget-list widget-mb-2">
                      <div className="sidebar-body">
                        <ul className="tags">
                          {subcategory.map((item, i) => {
                            return (
                              <li
                                // className={`category-menu ${
                                //   active === false ? "sub-active" : ""
                                // }`}
                                key={`category-${i}`}
                                // onClick={(e) =>
                                //   getSubcategoy(
                                //     item._id,
                                //     item.subcategory_name,
                                //     true
                                //   )
                                // }
                              >
                                <button>{item.subcategory_name}</button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
