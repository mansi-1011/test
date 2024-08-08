/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import FImg from '../../images/img/feature/feature-2.jpg'
import Brand1 from '../../images/img/brand-logo/brand-1.png'
import Brand2 from '../../images/img/brand-logo/brand-2.png'
import Brand3 from '../../images/img/brand-logo/brand-3.png'
import Brand4 from '../../images/img/brand-logo/brand-4.png'
import Brand5 from '../../images/img/brand-logo/brand-5.png'

export default function AboutUs() {

    const images = [Brand1, Brand2, Brand3, Brand4, Brand5]
    const SliderSetting = {
        slidesToShow: 4,
        autoplaySpeed: 3000,
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
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    return (
        <>
            <div className="breadcrumbs-area position-relative mb-text-p">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="breadcrumb-content position-relative section-content">
                                <h3 className="title-3">About Us</h3>
                                <ul>
                                    <li><Link to={'/'}>Home</Link></li>
                                    <li>About Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="feature-area mb-no-text">
                <div className="container container-default custom-area">
                    <div className="row">
                        <div className="col-xl-6 col-lg-5 col-md-12 col-custom">
                            <div className="feature-content-wrapper">
                                <h2 className="title">Important to eat fruit</h2>
                                <p className="desc-content">Eating fruit provides health benefits — people who eat more fruits and vegetables as part of an overall healthy diet are likely to have a reduced risk of some chronic diseases. Fruits provide nutrients vital for health and maintenance of your body.</p>
                                <p className="desc-content"> Fruits are sources of many essential nutrients that are underconsumed, including potassium, dietary fiber, vitamin C, and folate (folic acid).</p>
                                <p className="desc-content"> Most fruits are naturally low in fat, sodium, and calories. None have cholesterol.</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-md-12 col-custom">
                            <div className="feature-image position-relative">
                                <img src={FImg} alt="kg Feature" />
                                <div className="popup-video position-absolute">
                                    <a className="popup-vimeo" href="https://www.youtube.com/watch?v=_9VUPq3SxOc">
                                        <i className="ion-play"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newsletter-area mt-no-text mb-text-p">
                <div className="container container-default h-100 custom-area">
                    <div className="row h-100">
                        <div className="col-lg-8 col-xl-5 offset-xl-6 offset-lg-3 col-custom">
                            <div className="newsletter-content text-center d-flex flex-column align-items-center justify-content-center h-100">
                                <div className="section-content">
                                    <h4 className="title-4 text-uppercase">Special <span>Offer</span> for subscription</h4>
                                    <h2 className="title-3 text-uppercase">Get instant discount for membership</h2>
                                    <p className="desc-content">Subscribe our newsletter and all latest news of our <br />latest product, promotion and offers</p>
                                </div>
                                <div className="newsletter-form-wrap ml-auto mr-auto">
                                    <form id="mc-form" className="mc-form d-flex position-relative">
                                        <input type="email" id="mc-email" className="form-control email-box" placeholder="email@example.com" name="EMAIL" />
                                        <button id="mc-submit" className="btn primary-btn obrien-button newsletter-btn position-absolute" type="submit">Subscribe</button>
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
            <div className="brand-logo-area mt-text mb-no-text">
                <div className="container custom-area">
                    <div className="row">
                        <div className="col-lg-12 col-custom">
                            <Slider className="obrien-slider" {...SliderSetting} >
                                {
                                    images.map((item, i) => {
                                        return (
                                            <div className="brand-logo-item" key={`brand-${i}`}>
                                                <a href="#">
                                                    <img src={item} alt="Brand Logo" />
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
