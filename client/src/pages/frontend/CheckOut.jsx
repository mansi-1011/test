/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import env from "../../env.json";
import { setToast } from '../../redux/slices/ToastSlice';
import { setOrderID, setResetCart } from '../../redux/slices/ProductsSlice';

export default function CheckOut() {
    const [inputState, setInputState] = useState({
        country: '',
        first_name: '',
        last_name: '',
        company: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
        email: '',
        phone: '',
        order_notes: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItem = useSelector(state => state.product.cart)
    const cartTotal = useSelector(state => state.product.cartTotal)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleChange = (event) => {
        setInputState({
            ...inputState,
            [event.target.name]: event.target.value,
        });
    };

    function onSubmit() {
        Object.assign(inputState, { cart_total: cartTotal, cartItem: cartItem })
        axios.post(`${env.API_URL}/order/addorder`, inputState)
            .then((res) => {
                if (res.data.status) {
                    navigate('/orderconfirmed')
                    dispatch(setOrderID(res.data.order_id))
                    dispatch(setResetCart([]))
                    // dispatch(setToast({ type: "success", message: res.data.message }));
                } else {
                    dispatch(setToast({ type: "error", message: res.data.message }));
                }
            })
            .catch((error) => {
                dispatch(setToast({ type: "error", message: error.message }));
            });
    }
    return (
        <>
            <div className="breadcrumbs-area position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="breadcrumb-content position-relative section-content">
                                <h3 className="title-3">Checkout</h3>
                                <ul>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li>Checkout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="checkout-area">
                <div className="container container-default-2 custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="coupon-accordion">
                                <h3>Returning customer? <span id="showlogin">Click here to login</span></h3>
                                <div id="checkout-login" className="coupon-content">
                                    <div className="coupon-info">
                                        <p className="coupon-text">Quisque gravida turpis sit amet nulla posuere lacinia. Cras sed est
                                            sit amet ipsum luctus.</p>
                                        <form action="#">
                                            <p className="form-row-first">
                                                <label>Username or email <span className="required">*</span></label>
                                                <input type="text" />
                                            </p>
                                            <p className="form-row-last">
                                                <label>Password <span className="required">*</span></label>
                                                <input type="password" />
                                            </p>
                                            <p className="form-row">
                                                <input type="checkbox" id="remember_me" />
                                                <label htmlFor="remember_me">Remember me</label>
                                            </p>
                                            <p className="lost-password"><a href="#">Lost your password?</a></p>
                                        </form>
                                    </div>
                                </div>
                                <h3>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
                                <div id="checkout_coupon" className="coupon-checkout-content">
                                    <div className="coupon-info">
                                        <form action="#">
                                            <p className="checkout-coupon" >
                                                <input placeholder="Coupon code" type="text" />
                                                <input className="coupon-inner_btn" value="Apply Coupon" type="submit" />
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="checkbox-form">
                                    <h3>Billing Details</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="country-select clearfix">
                                                <label>Country <span className="required">*</span></label>
                                                {/* <select className="myniceselect nice-select wide rounded-0">
                                                    <option data-display="Bangladesh">Bangladesh</option>
                                                    <option value="uk">London</option>
                                                    <option value="rou">Romania</option>
                                                    <option value="fr">French</option>
                                                    <option value="de">Germany</option>
                                                    <option value="aus">Australia</option>
                                                </select> */}
                                                <Controller
                                                    name="country"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <select
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                            className={`${errors.country ? "is-invalid" : ""
                                                                }`}
                                                            name="country"
                                                            style={{ width: "100%" }}
                                                        >
                                                            <option defaultValue="">Please select...</option>
                                                            <option data-display="Bangladesh">Bangladesh</option>
                                                            <option value="uk">London</option>
                                                            <option value="rou">Romania</option>
                                                            <option value="fr">French</option>
                                                            <option value="de">Germany</option>
                                                            <option value="aus">Australia</option>
                                                        </select>
                                                    )}
                                                />
                                                {errors.country ? (
                                                    <span className="text-danger"> {errors.country?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>First Name <span className="required">*</span></label>
                                                <Controller
                                                    name="first_name"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.first_name || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.first_name ? "is-invalid" : ""}`}
                                                            name="first_name"
                                                            placeholder="Enter First Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.first_name ? (
                                                    <span className="text-danger"> {errors.first_name?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Last Name <span className="required">*</span></label>
                                                <Controller
                                                    name="last_name"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.last_name || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.last_name ? "is-invalid" : ""}`}
                                                            name="last_name"
                                                            placeholder="Enter Last Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.last_name ? (
                                                    <span className="text-danger"> {errors.last_name?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Company Name</label>
                                                <Controller
                                                    name="company"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.company || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.company ? "is-invalid" : ""}`}
                                                            name="company"
                                                            placeholder="Enter First Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.company ? (
                                                    <span className="text-danger"> {errors.company?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Address <span className="required">*</span></label>
                                                <Controller
                                                    name="address"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.address || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.address ? "is-invalid" : ""}`}
                                                            name="company"
                                                            placeholder="Enter Address Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.address ? (
                                                    <span className="text-danger"> {errors.address?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Town / City <span className="required">*</span></label>
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.city || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.city ? "is-invalid" : ""}`}
                                                            name="city"
                                                            placeholder="Enter City Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.city ? (
                                                    <span className="text-danger"> {errors.city?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>State / Country <span className="required">*</span></label>
                                                <Controller
                                                    name="state"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.state || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.state ? "is-invalid" : ""}`}
                                                            name="state"
                                                            placeholder="Enter State Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.state ? (
                                                    <span className="text-danger"> {errors.state?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Postcode / Zip <span className="required">*</span></label>
                                                <Controller
                                                    name="postcode"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.postcode || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.postcode ? "is-invalid" : ""}`}
                                                            name="postcode"
                                                            placeholder="Enter Country Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.postcode ? (
                                                    <span className="text-danger"> {errors.postcode?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Email Address <span className="required">*</span></label>
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.email || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.email ? "is-invalid" : ""}`}
                                                            name="email"
                                                            placeholder="Enter Email Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.email ? (
                                                    <span className="text-danger"> {errors.email?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Phone <span className="required">*</span></label>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.phone || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <input
                                                            type="text"
                                                            className={`${errors.phone ? "is-invalid" : ""}`}
                                                            name="phone"
                                                            placeholder="Enter Phone Name"
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.phone ? (
                                                    <span className="text-danger"> {errors.phone?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <div className="checkout-form-list create-acc">
                                                <input id="cbox" type="checkbox" />
                                                <label for="cbox">Create an account?</label>
                                            </div>
                                            <div id="cbox-info" className="checkout-form-list create-account">
                                                <p className="mb-2">Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                                <label>Account password <span className="required">*</span></label>
                                                <input placeholder="password" type="password" />
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="different-address">
                                        {/* <div className="ship-different-title">
                                            <div>
                                                <input id="ship-box" type="checkbox" />
                                                <label for="ship-box">Ship to a different address?</label>
                                            </div>
                                        </div>
                                        <div id="ship-box-info" className="row mt-2">
                                            <div className="col-md-12">
                                                <div className="myniceselect country-select clearfix">
                                                    <label>Country <span className="required">*</span></label>
                                                    <select className="myniceselect nice-select wide rounded-0">
                                                        <option data-display="Bangladesh">Bangladesh</option>
                                                        <option value="uk">London</option>
                                                        <option value="rou">Romania</option>
                                                        <option value="fr">French</option>
                                                        <option value="de">Germany</option>
                                                        <option value="aus">Australia</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>First Name <span className="required">*</span></label>
                                                    <input placeholder="" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Last Name <span className="required">*</span></label>
                                                    <input placeholder="" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Company Name</label>
                                                    <input placeholder="" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Address <span className="required">*</span></label>
                                                    <input placeholder="Street address" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <input placeholder="Apartment, suite, unit etc. (optional)" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Town / City <span className="required">*</span></label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>State / County <span className="required">*</span></label>
                                                    <input placeholder="" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Postcode / Zip <span className="required">*</span></label>
                                                    <input placeholder="" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Email Address <span className="required">*</span></label>
                                                    <input placeholder="" type="email" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Phone <span className="required">*</span></label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="order-notes mt-3">
                                            <div className="checkout-form-list checkout-form-list-2">
                                                <label>Order Notes</label>
                                                <Controller
                                                    name="order_notes"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: "This Field is Required." },
                                                    }}
                                                    defaultValue={inputState.order_notes || ''}
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <textarea
                                                            type="text"
                                                            className={`${errors.order_notes ? "is-invalid" : ""
                                                                }`}
                                                            cols="30" rows="10"
                                                            id="checkout-mess"
                                                            name="order_notes"
                                                            placeholder="Notes about your order, e.g. special notes for delivery."
                                                            {...field}
                                                            onChange={(event) => {
                                                                onChange(event);
                                                                handleChange(event);
                                                            }}
                                                        ></textarea>
                                                    )}
                                                />
                                                {errors.order_notes ? (
                                                    <span className="text-danger"> {errors.order_notes?.message}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="your-order">
                                    <h3>Your order</h3>
                                    <div className="your-order-table table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="cart-product-name">Product</th>
                                                    <th className="cart-product-total">Quantity</th>
                                                    <th className="cart-product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItem.map((item, i) => (
                                                        <tr key={i} className="cart_item">
                                                            <td className="cart-product-name">{item.product_name}<strong className="product-quantity"></strong></td>
                                                            <td className="cart-product-name text-center">{item.count}<strong className="product-quantity"></strong></td>
                                                            <td className="cart-product-total text-center"><span className="amount">£{item.price}.00</span></td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                            <tfoot>
                                                <tr className="cart-subtotal">
                                                    <th>Cart Subtotal</th>
                                                    <td className="text-center cart-product-name"><span className="amount">£{cartTotal}.00</span></td>
                                                </tr>
                                                <tr className="order-total">
                                                    <th>Order Total</th>
                                                    <td className="text-center"><strong><span className="amount">£{cartTotal}.00</span></strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="payment-method">
                                        <div className="payment-accordion">
                                            <div id="accordion">
                                                <div className="card">
                                                    <div className="card-header" id="#payment-1">
                                                        <h5 className="panel-title mb-2">
                                                            <a href="#" className="" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                Direct Bank Transfer.
                                                            </a>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                                        <div className="card-body mb-2 mt-2">
                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="#payment-2">
                                                        <h5 className="panel-title mb-2">
                                                            <a href="#" className="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                Cheque Payment
                                                            </a>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                                        <div className="card-body mb-2 mt-2">
                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="#payment-3">
                                                        <h5 className="panel-title mb-2">
                                                            <a href="#" className="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                PayPal
                                                            </a>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseThree" className="collapse" data-parent="#accordion">
                                                        <div className="card-body mb-2 mt-2">
                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-button-payment">
                                                <input value="Place order" type="submit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
