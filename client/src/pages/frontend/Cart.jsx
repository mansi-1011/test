/* eslint-disable jsx-a11y/anchor-is-valid */
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import env from '../../env.json'
import { setCartProduct, setDecreaseCountCart, setRemoveCartItem } from '../../redux/slices/ProductsSlice';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItem = useSelector(state => state.product.cart)
    const cartTotal = useSelector(state => state.product.cartTotal)

    const removeCartItem = (item) => {
        dispatch(setRemoveCartItem(item));
    };

    const addToCart = (item) => {
        dispatch(setCartProduct(item))
    }

    const DecreaseCountCart = (item) => {
        dispatch(setDecreaseCountCart(item))
    }
    // const checkOut = () =>{
    //     dispatch(setResetCart());
    //   }
    return (
        <>
            <div className="breadcrumbs-area position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="breadcrumb-content position-relative section-content">
                                <h3 className="title-3">Shopping Cart</h3>
                                <ul>
                                    <li><a href={""}>Home</a></li>
                                    <li>Cart</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-main-wrapper mt-no-text mb-no-text">
                <div className="container container-default-2 custom-area">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-table table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="pro-thumbnail">Image</th>
                                            <th className="pro-title">Product</th>
                                            <th className="pro-price">Price</th>
                                            <th className="pro-quantity">Quantity</th>
                                            {/* <th className="pro-subtotal">Total</th> */}
                                            <th className="pro-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItem.map((item, i) => (
                                            <tr key={i}>
                                                <td className="pro-thumbnail"><a href="#">
                                                    <img
                                                        src={
                                                            env.API_URL + "/" + item.product_images[0].path
                                                        }
                                                        className="cart-image"
                                                        alt={item.product_name}
                                                    /></a></td>
                                                <td className="pro-title"><a href="#">{item.product_name}</a></td>
                                                <td className="pro-price"><span>${item.price}.00</span></td>
                                                <td className="pro-quantity">
                                                    <div className="quantity">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" value={item.count} readOnly type="text" />
                                                            <div className="dec qtybutton" onClick={(e) => DecreaseCountCart(item, e)}><FontAwesomeIcon icon={faMinus} /></div>
                                                            <div className="inc qtybutton" onClick={(e) => addToCart(item, e)}><FontAwesomeIcon icon={faPlus} /></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td className="pro-subtotal"><span>$295.00</span></td> */}
                                                <td className="pro-remove"><button onClick={(e) => removeCartItem(item, e)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart-update-option d-block d-md-flex justify-content-between">
                                <div className="apply-coupon-wrapper">
                                    <form action="#" method="post" className=" d-block d-md-flex">
                                        <input type="text" placeholder="Enter Your Coupon Code" required />
                                        <button className="btn obrien-button primary-btn">Apply Coupon</button>
                                    </form>
                                </div>
                                <div className="cart-update mt-sm-16">
                                    <a href="#" className="btn obrien-button primary-btn">Update Cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5 ml-auto">
                            <div className="cart-calculator-wrapper">
                                <div className="cart-calculate-items">
                                    <h3>Cart Totals</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Sub Total</td>
                                                    <td>${cartTotal}</td>
                                                </tr>
                                                {/* <tr>
                                                <td>Shipping</td>
                                                <td>$70</td>
                                            </tr> */}
                                                <tr className="total">
                                                    <td>Total</td>
                                                    <td className="total-amount">${cartTotal}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <button className="btn obrien-button primary-btn d-block" onClick={() => navigate(`/checkout`)}>Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

