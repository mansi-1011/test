/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Axios from "axios";
import env from "../../env.json";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { setToast } from '../../redux/slices/ToastSlice';
import { useNavigate, Link } from 'react-router-dom';
import { setIsLoggedIn, setUser } from '../../redux/slices/UserAuthSlice';

export default function FLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [msg, setMsg] = useState({})
  const [inputState, setInputState] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });
  };

  function onSubmit() {
    Axios.post(`${env.API_URL}/customer/login`, inputState)
      .then((res) => {
        if (res.data.status) {
          dispatch(setIsLoggedIn(false))
          dispatch(setUser(res.data.username))
          localStorage.setItem("userAuth", res.data.token);
          setMsg({ sucess: res.data.message });
          setTimeout(() => {
            navigate('/')
          }, 1500);
        } else {
          setMsg({ error: res.data.message });
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
                <h3 className="title-3">Login-Register</h3>
                <ul>
                  <li><a href={'/'}>Home</a></li>
                  <li>Login-Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-register-area mt-no-text mb-no-text">
        <div className="container container-default-2 custom-area">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
              <div className="login-register-wrapper">
                <div className="section-content text-center mb-5">
                  <h2 className="title-4 mb-2">Login</h2>
                  <p className="desc-content">Please login using account detail bellow.</p>
                  {msg.sucess ? <div className="alert alert-success mt-2" role="alert">
                    {msg.sucess}
                  </div>
                    : ''}
                  {msg.error ? <div className="alert alert-danger mt-2" role="alert">
                    {msg.error}
                  </div>
                    : ''}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <div className="single-input-item mb-3">
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: { value: true, message: "This Field is Required." },
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Enter a valid e-mail address',
                        },
                      }}
                      defaultValue={inputState.email || ""}
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          onChange={(event) => { onChange(event); handleChange(event); }}
                          value={inputState.email || ""}
                          type="text"
                          name="email"
                          placeholder="Email"
                        />
                      )}
                    />
                    {errors.email ? (
                      <span className="text-danger">{errors.email?.message}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="single-input-item mb-3">
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: { value: true, message: "This Field is Required." }
                      }}
                      defaultValue={inputState.password || ""}
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          onChange={(event) => { onChange(event); handleChange(event); }}
                          value={inputState.password || ""}
                          type="password"
                          name="password"
                          placeholder="Enter your Password"
                        />
                      )}
                    />
                    {errors.password ? (
                      <span className="text-danger">{errors.password?.message}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="single-input-item mb-3">
                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                      <div className="remember-meta mb-3">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="rememberMe" />
                          <label className="custom-control-label" htmlFor="rememberMe">Remember Me</label>
                        </div>
                      </div>
                      <a href="#" className="forget-pwd mb-3">Forget Password?</a>
                    </div>
                  </div>
                  <div className="single-input-item mb-3">
                    <button className="btn obrien-button-2 primary-color">Login</button>
                  </div>
                  <div className="single-input-item">
                    <Link to="/register">Creat Account</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
