/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faBagShopping,
  faTrash,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../images/img/logo/kgkruch.png";
import env from "../../../../env.json";
import {
  setCartTotal,
  setRemoveCartItem,
} from "../../../../redux/slices/ProductsSlice";
import { setIsLoggedIn } from "../../../../redux/slices/UserAuthSlice";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = localStorage.getItem("userAuth");
  const cart = useSelector((state) => state.product.cart);
  const userData = useSelector((state) => state.user.user);
  const getItemsCount = (cart) => {
    let cartItemCount = 0;
    cart.forEach((item) => {
      cartItemCount = cartItemCount + item.count;
    });
    return cartItemCount;
  };

  const removeCartItem = (item) => {
    dispatch(setRemoveCartItem(item));
  };

  const Key = ["customeAuth", "userAuth"];
  const LogOut = (e) => {
    e.preventDefault();
    Key.map((key, _index) => localStorage.removeItem(key));
    dispatch(setIsLoggedIn(false));
    navigate("/");
  };

  const getSubtotalPrice = (cart) => {
    let subtotal = 0;
    cart.forEach((carts) => {
      subtotal = subtotal + carts.price * carts.count;
    });
    dispatch(setCartTotal(subtotal));
    return subtotal;
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".header-sticky");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add("sticky")
      : header.classList.remove("sticky");
  };
  // const checkOut = () =>{
  //   dispatch(setCartProduct());
  // }

  return (
    <>
      <header className="main-header-area">
        <div className="main-header">
          <div className="container container-default custom-area">
            <div className="row">
              <div className="col-lg-12 col-custom">
                <div className="row align-items-center">
                  <div className="col-lg-2 col-xl-2 col-sm-6 col-6 col-custom">
                    <div className="header-logo d-flex align-items-center">
                      <a href={"/"}>
                        <img
                          className="img-full"
                          src={logo}
                          alt="Header Logo"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-8 col-xl-7 position-static d-none d-lg-block col-custom">
                    <nav className="main-nav d-flex justify-content-center">
                      <ul className="nav">
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/" ? "active" : ""
                            }`}
                            to="/"
                          >
                            <span className="menu-text"> Home</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/shop" ? "active" : ""
                            }`}
                            to="shop"
                          >
                            <span className="menu-text">Shop</span>
                            {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/categories"
                                ? "active"
                                : ""
                            }`}
                            to="categories"
                          >
                            <span className="menu-text">Category</span>
                            {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/about-us" ? "active" : ""
                            }`}
                            to="about-us"
                          >
                            <span className="menu-text">About</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/contact" ? "active" : ""
                            }`}
                            to="contact"
                          >
                            <span className="menu-text">Contact</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-lg-2 col-xl-3 col-sm-6 col-6 col-custom">
                    <div className="header-right-area main-nav">
                      <ul className="nav">
                        <li className="login-register-wrap d-none d-xl-flex">
                          {userAuth ? (
                            <>
                              <span>
                                <Link to="#" onClick={(e) => LogOut(e)}>
                                  Logout
                                </Link>
                              </span>
                              <span>
                                <Link
                                  to="#"
                                  className={`${userData ? "active" : ""}`}
                                >
                                  {userData}
                                </Link>
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                <Link
                                  className={`${
                                    location.pathname === "/login"
                                      ? "active"
                                      : ""
                                  }`}
                                  to="login"
                                >
                                  Login
                                </Link>
                              </span>
                              <span>
                                <Link
                                  className={`${
                                    location.pathname === "/register"
                                      ? "active"
                                      : ""
                                  }`}
                                  to="register"
                                >
                                  Register
                                </Link>
                              </span>
                            </>
                          )}
                        </li>
                        <li className="minicart-wrap">
                          <button
                            className="minicart-btn toolbar-btn"
                            style={{ fontSize: "20px" }}
                          >
                            <FontAwesomeIcon icon={faBagShopping} />
                            {getItemsCount(cart) > 0 ? (
                              <span className="cart-item_count">
                                {getItemsCount(cart)}
                              </span>
                            ) : (
                              ""
                            )}
                          </button>
                          {cart && cart.length ? (
                            <div className="cart-item-wrapper dropdown-sidemenu dropdown-hover-2">
                              {cart.map((item, i) => (
                                <div key={i} className="single-cart-item">
                                  <div className="cart-img">
                                    <img
                                      src={
                                        env.API_URL +
                                        "/" +
                                        item.product_images[0].path
                                      }
                                      alt="images"
                                    />
                                  </div>
                                  <div className="cart-text">
                                    <h5 className="title">
                                      {item.product_name}
                                    </h5>
                                    <div className="cart-text-btn">
                                      <div className="cart-qty">
                                        <span className="">{item.count}</span>
                                        <span className="ms-2">×</span>
                                        <span className="cart-price ms-2">
                                          ${item.price}.00
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={(e) => removeCartItem(item, e)}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              <div className="cart-price-total d-flex justify-content-between">
                                <h5>Total :</h5>
                                <h5>${getSubtotalPrice(cart)}.00</h5>
                              </div>
                              <div className="cart-links d-flex justify-content-center">
                                <button
                                  className="obrien-button white-btn"
                                  onClick={() => navigate(`/cart`)}
                                >
                                  View cart
                                </button>
                                {/* <button
                                className="obrien-button white-btn"
                                onClick={() => navigate(`/checkout`)}
                              >
                                Checkout
                              </button> */}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                        <li className="mobile-menu-btn d-lg-none">
                          <button className="off-canvas-btn" href="#">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-header header-sticky">
          <div className="container container-default custom-area">
            <div className="row">
              <div className="col-lg-12 col-custom">
                <div className="row align-items-center">
                  <div className="col-lg-2 col-xl-2 col-sm-6 col-6 col-custom">
                    <div className="header-logo d-flex align-items-center">
                      <a href={""}>
                        <img
                          className="img-full"
                          src={logo}
                          alt="Header Logo"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-8 col-xl-7 position-static d-none d-lg-block col-custom">
                    <nav className="main-nav d-flex justify-content-center">
                      <ul className="nav">
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/" ? "active" : ""
                            }`}
                            to=""
                          >
                            <span className="menu-text"> Home</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/shop" ? "active" : ""
                            }`}
                            to="shop"
                          >
                            <span className="menu-text">Shop</span>
                            {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/categories"
                                ? "active"
                                : ""
                            }`}
                            to="categories"
                          >
                            <span className="menu-text">Category</span>
                            {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/about-us" ? "active" : ""
                            }`}
                            to="about-us"
                          >
                            <span className="menu-text"> About</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/contact" ? "active" : ""
                            }`}
                            to="contact"
                          >
                            <span className="menu-text">Contact</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-lg-2 col-xl-3 col-sm-6 col-6 col-custom">
                    <div className="header-right-area main-nav">
                      <ul className="nav">
                        <li className="login-register-wrap d-none d-xl-flex">
                          {userAuth ? (
                            <>
                              <span>
                                <Link to="#" onClick={(e) => LogOut(e)}>
                                  Logout
                                </Link>
                              </span>
                              <span>
                                <Link
                                  to="#"
                                  className={`${userData ? "active" : ""}`}
                                >
                                  {userData}
                                </Link>
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                <Link
                                  className={`${
                                    location.pathname === "/login"
                                      ? "active"
                                      : ""
                                  }`}
                                  to="login"
                                >
                                  Login
                                </Link>
                              </span>
                              <span>
                                <Link
                                  className={`${
                                    location.pathname === "/register"
                                      ? "active"
                                      : ""
                                  }`}
                                  to="register"
                                >
                                  Register
                                </Link>
                              </span>
                            </>
                          )}
                        </li>
                        <li className="minicart-wrap">
                          <button
                            className="minicart-btn toolbar-btn"
                            style={{ fontSize: "20px" }}
                          >
                            <FontAwesomeIcon icon={faBagShopping} />
                            {getItemsCount(cart) > 0 ? (
                              <span className="cart-item_count">
                                {getItemsCount(cart)}
                              </span>
                            ) : (
                              ""
                            )}
                          </button>
                          {cart && cart.length ? (
                            <div className="cart-item-wrapper dropdown-sidemenu dropdown-hover-2">
                              {cart.map((item, i) => (
                                <div key={i} className="single-cart-item">
                                  <div className="cart-img">
                                    <img
                                      src={
                                        env.API_URL +
                                        "/" +
                                        item.product_images[0].path
                                      }
                                      alt="images"
                                    />
                                  </div>
                                  <div className="cart-text">
                                    <h5 className="title">
                                      {item.product_name}
                                    </h5>
                                    <div className="cart-text-btn">
                                      <div className="cart-qty">
                                        <span className="">{item.count}</span>
                                        <span className="ms-2">×</span>
                                        <span className="cart-price ms-2">
                                          ${item.price}.00
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={(e) => removeCartItem(item, e)}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              <div className="cart-price-total d-flex justify-content-between">
                                <h5>Total :</h5>
                                <h5>${getSubtotalPrice(cart)}.00</h5>
                              </div>
                              <div className="cart-links d-flex justify-content-center">
                                <button
                                  className="obrien-button white-btn"
                                  onClick={() => navigate(`/cart`)}
                                >
                                  View cart
                                </button>
                                {/* <button
                                className="obrien-button white-btn"
                                onClick={() => navigate(`/checkout`)}
                              >
                                Checkout
                              </button> */}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                        <li className="mobile-menu-btn d-lg-none">
                          <button className="off-canvas-btn" href="#">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="off-canvas-wrapper" id="mobileMenu">
          <div className="off-canvas-overlay"></div>
          <div className="off-canvas-inner-content">
            <div className="btn-close-off-canvas">
              {/* <i className="fa fa-times"></i> */}
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="off-canvas-inner">
              <div className="search-box-offcanvas">
                <form>
                  <input type="text" placeholder="Search product..." />
                  <button className="search-btn">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </div>
              <div className="mobile-navigation">
                <nav>
                  <ul className="mobile-menu">
                    <li className="menu-item-has-children">
                      <a href="#">Home</a>
                      <ul className="dropdown">
                        <li>
                          <a href={""}>Home Page 1</a>
                        </li>
                        <li>
                          <a href="index-2.html">Home Page 2</a>
                        </li>
                        <li>
                          <a href="index-3.html">Home Page 3</a>
                        </li>
                        <li>
                          <a href="index-4.html">Home Page 4</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#">Shop</a>
                      <ul className="megamenu dropdown">
                        <li className="mega-title has-children">
                          <a href="#">Shop Layouts</a>
                          <ul className="dropdown">
                            <li>
                              <a href="shop.html">Shop Left Sidebar</a>
                            </li>
                            <li>
                              <a href="shop-right-sidebar.html">
                                Shop Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-left.html">
                                Shop List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-right.html">
                                Shop List Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-fullwidth.html">Shop Full Width</a>
                            </li>
                          </ul>
                        </li>
                        <li className="mega-title has-children">
                          <a href="#">Product Details</a>
                          <ul className="dropdown">
                            <li>
                              <a href="product-details.html">
                                Single Product Details
                              </a>
                            </li>
                            <li>
                              <a href="variable-product-details.html">
                                Variable Product Details
                              </a>
                            </li>
                            <li>
                              <a href="external-product-details.html">
                                External Product Details
                              </a>
                            </li>
                            <li>
                              <a href="gallery-product-details.html">
                                Gallery Product Details
                              </a>
                            </li>
                            <li>
                              <a href="countdown-product-details.html">
                                Countdown Product Details
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="mega-title has-children">
                          <a href="#">Others</a>
                          <ul className="dropdown">
                            <li>
                              <a href="error404.html">Error 404</a>
                            </li>
                            <li>
                              <a href="compare.html">Compare Page</a>
                            </li>
                            <li>
                              <a href="cart.html">Cart Page</a>
                            </li>
                            <li>
                              <a href="checkout.html">Checkout Page</a>
                            </li>
                            <li>
                              <a href="wishlist.html">Wish List Page</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children ">
                      <a href="#">Blog</a>
                      <ul className="dropdown">
                        <li>
                          <a href="blog.html">Blog Left Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-list-right-sidebar.html">
                            Blog List Right Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-list-fullwidth.html">
                            Blog List Fullwidth
                          </a>
                        </li>
                        <li>
                          <a href="blog-grid.html">Blog Grid Page</a>
                        </li>
                        <li>
                          <a href="blog-grid-right-sidebar.html">
                            Blog Grid Right Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-grid-fullwidth.html">
                            Blog Grid Fullwidth
                          </a>
                        </li>
                        <li>
                          <a href="blog-details-sidebar.html">
                            Blog Details Sidebar Page
                          </a>
                        </li>
                        <li>
                          <a href="blog-details-fullwidth.html">
                            Blog Details Fullwidth Page
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children ">
                      <a href="#">Pages</a>
                      <ul className="dropdown">
                        <li>
                          <a href="frequently-questions.html">FAQ</a>
                        </li>
                        <li>
                          <a href="my-account.html">My Account</a>
                        </li>
                        <li>
                          <a href="login-register.html">login &amp; register</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        className={`${
                          location.pathname === "/about-us" ? "active" : ""
                        }`}
                        to="about-us"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`${
                          location.pathname === "/contact" ? "active" : ""
                        }`}
                        to="contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header-top-settings offcanvas-curreny-lang-support">
                <nav>
                  <ul className="mobile-menu">
                    <li className="menu-item-has-children">
                      <a href="#">My Account</a>
                      <ul className="dropdown">
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/login" ? "active" : ""
                            }`}
                            to="login"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${
                              location.pathname === "/register" ? "active" : ""
                            }`}
                            to="register"
                          >
                            Register
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#">Currency:USD</a>
                      <ul className="dropdown">
                        <li>
                          <a href="#">USD - US Dollar</a>
                        </li>
                        <li>
                          <a href="#">EUR - Euro</a>
                        </li>
                        <li>
                          <a href="#">GBP - British Pound</a>
                        </li>
                        <li>
                          <a href="#">INR - Indian Rupee</a>
                        </li>
                        <li>
                          <a href="#">BDT - Bangladesh Taka</a>
                        </li>
                        <li>
                          <a href="#">JPY - Japan Yen</a>
                        </li>
                        <li>
                          <a href="#">CAD - Canada Dollar</a>
                        </li>
                        <li>
                          <a href="#">AUD - Australian Dollar</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="offcanvas-widget-area">
                <div className="top-info-wrap text-left text-black">
                  <ul>
                    <li>
                      <i className="fa fa-phone"></i>
                      <a href="info%40yourdomain.html">(1245) 2456 012</a>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <a href="info%40yourdomain.html">info@yourdomain.com</a>
                    </li>
                  </ul>
                </div>
                <div className="off-canvas-widget-social">
                  <a title="Facebook-f" href="#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                  <a title="Twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a title="Linkedin" href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a title="Youtube" href="#">
                    <i className="fa fa-youtube"></i>
                  </a>
                  <a title="Vimeo" href="#">
                    <i className="fa fa-vimeo"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </header>
    </>
  );
}
