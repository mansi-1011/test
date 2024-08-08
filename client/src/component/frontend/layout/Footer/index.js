/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import footerLogo from "../../../../images/img/logo/kgkruch.png";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faVimeoV,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="support-area">
        <div className="container container-default custom-area">
          <div className="row">
            <div className="col-lg-12 col-custom">
              <div className="support-wrapper d-flex">
                <div className="support-content">
                  <h1 className="title">Need Help ?</h1>
                  <p className="desc-content">
                    Call our support 24/7 at 01234-567-890
                  </p>
                </div>
                <div className="support-button d-flex align-items-center">
                  <a
                    className="obrien-button primary-btn"
                    href="contact-us.html"
                  >
                    Contact now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-area">
        <div className="footer-widget-area">
          <div className="container container-default custom-area">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-custom">
                <div className="single-footer-widget m-0">
                  <div className="footer-logo">
                    <a href={"/"}>
                      <img  src={footerLogo} alt="Logo" />
                    </a>
                  </div>
                  <p className="desc-content">
                    kgkrunch is the best parts shop of your daily nutritions.
                    What kind of nutrition do you need you can get here soluta
                    nobis
                  </p>
                  <div className="social-links">
                    <ul className="d-flex">
                      <li>
                        <a
                          className="border rounded-circle"
                          href="#"
                          title="Facebook"
                        >
                          <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                      </li>
                      <li>
                        <a
                          className="border rounded-circle"
                          href="#"
                          title="Twitter"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      </li>
                      <li>
                        <a
                          className="border rounded-circle"
                          href="#"
                          title="Linkedin"
                        >
                          <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                      </li>
                      <li>
                        <a
                          className="border rounded-circle"
                          href="#"
                          title="Youtube"
                        >
                          <FontAwesomeIcon icon={faYoutube} />
                        </a>
                      </li>
                      <li>
                        <a
                          className="border rounded-circle"
                          href="#"
                          title="Vimeo"
                        >
                          <FontAwesomeIcon icon={faVimeoV} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-custom">
                <div className="single-footer-widget">
                  <h2 className="widget-title">Information</h2>
                  <ul className="widget-list">
                    <li>
                      <Link to={"/about-us"}>Our Company</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Contact Us</Link>
                    </li>
                    <li>
                      <Link to={"/about-us"}>Our Services</Link>
                    </li>
                    <li>
                      <Link to={"/about-us"}>Why We?</Link>
                    </li>
                    <li>
                      <Link to={"/about-us"}>Careers</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-custom">
                <div className="single-footer-widget">
                  <h2 className="widget-title">Quicklink</h2>
                  <ul className="widget-list">
                    <li>
                      <Link to={"/about-us"}>About</Link>
                    </li>
                    {/* <li>
                      <a href="blog.html">Blog</a>
                    </li> */}
                    <li>
                      <Link to={"/shop"}>Shop</Link>
                    </li>
                    <li>
                      <Link to={"/cart"}>Cart</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-custom">
                <div className="single-footer-widget">
                  <h2 className="widget-title">Support</h2>
                  <ul className="widget-list">
                    <li>
                      <Link to={"/contact"}>Online Support</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Shipping Policy</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Return Policy</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Terms of Service</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-custom">
                <div className="single-footer-widget">
                  <h2 className="widget-title">See Information</h2>
                  <div className="widget-body">
                    <address>
                      123, H2, Road #21, Main City, Your address goes here.
                      <br />
                      Phone: 01254 698 785, 36598 254 987
                      <br />
                      Email: https://example.com
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright-area">
          <div className="container custom-area">
            <div className="row">
              <div className="col-12 text-center col-custom">
                <div className="copyright-content">
                  <p>
                    Copyright © 2022
                    <a
                      href="https://kgkrunch.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1"
                    >
                      KgKrunch
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
