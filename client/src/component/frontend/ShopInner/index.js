import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";

import ReactPaginate from "react-paginate";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faBagShopping,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import env from "../../../env.json";
import { useNavigate, Link } from "react-router-dom";
import { setProducts } from "../../../redux/slices/ProductsSlice";
import { setToast } from "../../../redux/slices/ToastSlice";
import { getApiByIdAndName } from "../../../helper/Helper";
// import Helper from "../../../helper/Helper";

export default function ShopInner({
  onSubcategoryGet,
  addToCart,
  getProduct,
  getSubcategoy,
  title,
  active,
  ...props
}) {
  const filter = [
    { name: "default", value: "Default" },
    { name: "low", value: "Sort by price: low to high" },
    { name: "high", value: "Sort by price: high to low" },
    { name: "new", value: "Sort by newness" },
  ];

  const shop = useSelector((state) => state.product.product);
  const categories = useSelector((state) => state.product.category);
  const subCategory = useSelector((state) => state.menu.subcategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const shopProductPerPage = 12;
  const numberOfProductsVistited = page * shopProductPerPage;
  const displayProduct = shop.slice(
    numberOfProductsVistited,
    numberOfProductsVistited + shopProductPerPage
  );

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  const totalPages = Math.ceil(shop.length / shopProductPerPage);
  // const FilterByName = (event) => {
  //   setSelect(event.target.value);
  // };
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

  const FilterByName = (event) => {
    getApiByIdAndName(`${env.API_URL}/product/filters/`, event.target.value)
      .then((res) => {
        if (res.data.status) {
          dispatch(setProducts(res.data.products));
        } else {
          dispatch(setToast({ type: "error", message: res.data.message }));
        }
      })
      .catch((error) => {
        dispatch(setToast({ type: "error", message: error.message }));
      });
  };
  return (
    <>
      <div className="shop-main-area">
        <div className="container container-default custom-area">
          <div className="row flex-row-reverse">
            <div className="col-lg-9 col-12 col-custom widget-mt">
              <div className="shop_toolbar_wrapper">
                <div className="sub-title col-lg-8">
                  {title ? (
                    <h4 className="titles">{title}</h4>
                  ) : (
                    <h4>All Products</h4>
                  )}
                </div>
                <div className="shop-select col-lg-4">
                  <form
                    // onSubmit={(e) =>hendleSubmit(e)}
                    className="d-flex flex-column w-100"
                    action="#"
                  >
                    <div className="form-group">
                      <select
                        onChange={(e) => FilterByName(e)}
                        name="filter"
                        className="form-control-select nice-select w-100"
                      >
                        {filter.map((item, i) => (
                          <option value={item.name} key={`filter-${i}`}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row shop_wrapper grid_3">
                {displayProduct && displayProduct.length ? (
                  displayProduct.map((item, i) => (
                    <div
                      key={`shop-${i}`}
                      className="col-md-6 col-sm-6 col-lg-4 col-custom product-area"
                    >
                      <div className="single-product position-relative">
                        <Slider className="" {...SliderSetting}>
                          {item.product_images.map((img, i) => {
                            return (
                              <div key={i} className="product-image">
                                <img
                                  src={`${env.API_URL + "/" + img.path}`}
                                  alt={item.product_name}
                                  className="product-image-3"
                                />
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
                            <span className="regular-price">
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
                  ))
                ) : (
                  <div className="row shop_wrapper grid_3">
                    <div className="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
                      <div className="single-product position-relative">
                        <p className="alert alert-success">
                          {" "}
                          No Have Products{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="row">
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
              </div>
            </div>
            <div className="col-lg-3 col-12 col-custom">
              <aside className="sidebar_widget widget-mt">
                <div className="widget_inner">
                  <div className="widget-list widget-mb-2">
                    <h3 className="widget-title">All Products</h3>
                    <div className="search-box">
                      <div className="input-group">
                        <div className="widget-list widget-mb-2">
                          <div className="sidebar-body">
                            <ul className="tags">
                              <li>
                                <button onClick={(e) => getProduct()}>
                                  All
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-list widget-mb-1">
                    <h3 className="widget-title">Categories</h3>
                    <div className="search-box">
                      <div className="input-group">
                        <div className="widget-list widget-mb-2">
                          <div className="sidebar-body">
                            <ul className="tags">
                              {categories.map((item, i) => {
                                return (
                                  <li
                                    key={`category-${i}`}
                                    className={`category-menu ${
                                      active === true ? "active" : ""
                                    }`}
                                    onClick={(e) =>
                                      getProduct(
                                        item._id,
                                        item.category_name,
                                        true
                                      )
                                    }
                                  >
                                    <button>{item.category_name}</button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-list widget-mb-2">
                    <h3 className="widget-title">SubCategories</h3>
                    <div className="search-box">
                      <div className="input-group">
                        <div className="widget-list widget-mb-2">
                          <div className="sidebar-body">
                            <ul className="tags">
                              {subCategory.map((item, i) => {
                                return (
                                  <li
                                    className={`category-menu ${
                                      active === false ? "sub-active" : ""
                                    }`}
                                    key={`category-${i}`}
                                    onClick={(e) =>
                                      getSubcategoy(
                                        item._id,
                                        item.subcategory_name,
                                        true
                                      )
                                    }
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
      </div>
    </>
  );
}
