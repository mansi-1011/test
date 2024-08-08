/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { setToast } from '../../redux/slices/ToastSlice';
import env from "../../env.json";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [error, setErrors] = useState({})
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
    Axios.post(`${env.API_URL}/customer/register`, inputState)
      .then((res) => {
        if (res.data.status) {
          setErrors({})
          setMsg({ sucess: res.data.message });
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        } else {
          setErrors({ email: res.data.message });
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
                  <li><a href={""}>Home</a></li>
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
                  <h2 className="title-4 mb-2">Create Account</h2>
                  <p className="desc-content">Please Register using account detail bellow.</p>
                  {msg.sucess ? <div className="alert alert-success" role="alert">
                    {msg.sucess}
                  </div>
                    : ''}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >
                  <div className="single-input-item mb-3">
                    <Controller
                      name="first_name"
                      control={control}
                      rules={{
                        required: { value: true, message: "This Field is Required." },
                      }}
                      defaultValue={inputState.first_name || ""}
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          onChange={(event) => {
                            onChange(event);
                            handleChange(event);
                          }}
                          value={inputState.first_name || ""}
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                        />
                      )}
                    />
                    {errors.first_name ? (
                      <span className="text-danger">{errors.first_name?.message}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="single-input-item mb-3">
                    <Controller
                      name="last_name"
                      control={control}
                      rules={{
                        required: { value: true, message: "This Field is Required." },
                      }}
                      defaultValue={inputState.last_name || ""}
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          onChange={(event) => {
                            onChange(event);
                            handleChange(event);
                          }}
                          value={inputState.last_name || ""}
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                        />
                      )}
                    />
                    {errors.last_name ? (
                      <span className="text-danger">{errors.last_name?.message}</span>
                    ) : (
                      ""
                    )}
                  </div>
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
                          onChange={(event) => {
                            onChange(event);
                            handleChange(event);
                          }}
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
                    {error.email ? (
                      <span className="text-danger">{error.email}</span>
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
                          onChange={(event) => {
                            onChange(event);
                            handleChange(event);
                          }}
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
                          <label className="custom-control-label" htmlFor="rememberMe">Subscribe Our Newsletter</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-input-item mb-3">
                    <button className="btn obrien-button-2 primary-color">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
