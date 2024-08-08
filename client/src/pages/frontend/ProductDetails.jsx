/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import env from "../../env.json";
import { setCartProduct } from "../../redux/slices/ProductsSlice";

// import Details from '../../component/frontend/Details';


export default function ProductDetails() {
    const { slug_name } = useParams();
    const [datas, setDatas] = useState({});
    // const [num, setNum] = useState(1);
    const [images, setImages] = useState([]);
    const firstRenderRef = useRef(true);
    const dispatch = useDispatch();


    const addToCart = (item) => {
        dispatch(setCartProduct(item));
    };

    const fetchModel = useCallback(() => {
        axios.get(`${env.API_URL}/product/slug/${slug_name}`).then((res) => {
            if (res.data.status) {
                setDatas(res.data.productData);
                setImages(res.data.productData.product_images);
                // console.log(product_images ,"fdgbfh");
            }
        });
    }, [setDatas,setImages, slug_name]);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        fetchModel();
    }, [fetchModel]);

    const SliderSetting = {
        slidesToShow: 1,
        fade: true,
        arrows: false,
        dots: false,
        swipe: false,
        asNavFor: ".pd-slider-nav",
        draggable: false,
    };
    // let incNum = () => {
    //     if (num < 100000) {
    //         setNum(Number(num) + 1);
    //     }
    // };
    // let decNum = () => {
    //     if (num > 1) {
    //         setNum(num - 1);
    //     }
    // }

    // let handleChange = (e) => {
    //     setNum(e.target.value);
    // }
    return (
        <div className="shop-wrapper">
            <div className="breadcrumbs-area position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="breadcrumb-content position-relative section-content">
                                <h3 className="title-3">Product Details</h3>
                                <ul>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li>Product Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-product-main-area">
                <div className="container container-default custom-area">
                    <div className="row">
                        <div className="col-lg-5 col-custom">
                            <div className="product-details-img horizontal-tab">
                                <Slider
                                    className="product-slider popup-gallery product-details_slider"
                                    {...SliderSetting} >
                                    {/* {data.product_images.map((item, i) => {
                                        return (
                                            <div key={i} className="single-image border">
                                                <img
                                                    src={`${env.API_URL + "/" + item.path}`}
                                                    //   alt={item.product_name}
                                                    className="product-image-1"
                                                // width={400}
                                                // height={450}
                                                />
                                            </div>
                                        )
                                    })} */}

                                    {images.map((img, i) => (
                                        <div className="single-image border" key={i}>
                                            {/* <Link to={`/product-details/${item.slug_name}`}> */}
                                            <img
                                                src={`${env.API_URL + "/" + img.path}`}
                                                alt={datas.product_name}
                                                className="product-image-1"
                                            // width={400}
                                            // height={450}
                                            />
                                            {/* </Link> */}
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-lg-7 col-custom">
                            <div className="product-summery position-relative">
                                <div className="product-head mb-3">
                                    <h2 className="product-title">{datas.product_name}</h2>
                                </div>
                                <div className="price-box mb-2">
                                    <span className="regular-price">${datas.price}.00</span>
                                </div>
                                <div className="product-rating mb-3"></div>
                                <div className="sku mb-3">
                                    <span>SKU: {datas.sku}</span>
                                </div>
                                <p className="desc-content mb-5">{datas.description}</p>
                                <div className="quantity-with_btn mb-4">
                                    <div className="quantity">
                                        {/* <div className="cart-plus-minus">
                                            <input
                                                className="cart-plus-minus-box"
                                                value={`${num}/kg `}
                                                onChange={(e) => handleChange(e)}
                                                type="text"
                                            />
                                            <div className="dec qtybutton" onClick={decNum}>-</div>
                                            <div className="inc qtybutton" onClick={incNum}>+</div>
                                        </div> */}
                                    </div>
                                    <div className="add-to_cart">
                                        <button className="btn obrien-button primary-btn" onClick={(e) => addToCart(datas, e)}>
                                            Add to cart
                                        </button>
                                        <a
                                            className="btn obrien-button-2 treansparent-color pt-0 pb-0"
                                            href="wishlist.html"
                                        >
                                            Add to wishlist
                                        </a>
                                    </div>
                                </div>
                                <div className="buy-button mb-5">
                                    <a href="#" className="btn obrien-button-3 black-button">
                                        Buy it now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
