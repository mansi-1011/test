/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import env from "../../env.json";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/slices/ToastSlice";
import Logo from '../../images/img/logo/kgkruch.png'

export default function Login() {
    const [userState, setUserState] = useState();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };


    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(`${env.API_URL}/user/login`, userState)
            .then((res) => {
                if (res.data.status) {
                    localStorage.setItem("user", res.data.token);
                    // setTimeout(() => window.location.href = '/admin/dashboard', 2000);
                    routeChange("/admin/dashboard");
                    // window.location = "/admin/dashboard"
                    dispatch(setToast({ type: "success", message: res.data.message }))
                } else {
                    dispatch(setToast({ type: "error", message: res.data.message }))
                }
            })
            .catch((error) => {
                dispatch(setToast({ type: "success", message: error.message }));

            });
    }

    function handleChange(event) {
        setUserState({
            ...userState,
            [event.target.name]: event.target.value,
        });
    }
    return (
        <>
            <div className="container-scroller admin-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src={Logo} alt="logo" />
                                    </div>
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="font-weight-light">Sign in to continue.</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="email"
                                                onChange={(e) => handleChange(e)}
                                                className="form-control form-control-lg p_input"
                                                placeholder="Username"
                                                id="exampleInputEmail1"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                // id="exampleInputPassword1"
                                                type="text"
                                                onChange={(e) => handleChange(e)}
                                                className="form-control form-control-lg p_input"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" type="submit" onClick={(e) => handleSubmit(e)}>SIGN IN</button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Don't have an account? <Link to="/registration" className="text-primary">Create</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
