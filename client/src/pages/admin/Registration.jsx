/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import env from "../../env.json";
import Logo from '../../images/img/logo/kgkruch.png'
import { setToast } from "../../redux/slices/ToastSlice";

export default function Registration() {
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
    Axios.post(`${env.API_URL}/user/register`, inputState)
      .then((res) => {
        if (res.data.status) {
          // dispatch(setIsLoggedIn(false))
          // dispatch(setUser(res.data.username))
          localStorage.setItem("userAuth", res.data.token);
          setMsg({ sucess: res.data.message });
          setTimeout(() => {
            // navigate('/admin')
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
    <div className="container-scroller admin-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo center">
                  <img src={Logo} alt="logo" />
                </div>
                <h6 className="font-weight-light">Sign up to continue.</h6>
                {msg.sucess ? <div className="alert alert-success mt-2" role="alert">
                  {msg.sucess}
                </div>
                  : ''}
                {msg.error ? <div className="alert alert-danger mt-2" role="alert">
                  {msg.error}
                </div>
                  : ''}
                <form className="pt-3" onSubmit={handleSubmit(onSubmit)} >
                  <div className="form-group">
                    <label>Username</label>
                    <Controller
                      name="username"
                      control={control}
                      rules={{
                        required: { value: true, message: "This Field is Required." },
                      }}
                      defaultValue={inputState.username || ""}
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          onChange={(event) => { onChange(event); handleChange(event); }}
                          value={inputState.username || ""}
                          type="text"
                          name="username"
                          placeholder="username"
                          className="form-control form-control-lg p_input"
                        />
                      )}
                    />
                    {errors.username ? (
                      <span className="text-danger">{errors.username?.message}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
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
                          className="form-control form-control-lg p_input"
                        />
                      )}
                    />
                    {errors.email ? (
                      <span className="text-danger">{errors.email?.message}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>Password</label>
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
                          className="form-control form-control-lg p_input"
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
                  <div className="text-center">
                    <button className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" type="submit" >
                      SIGN UP
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    <p className="sign-up text-center">
                      Already have an Account? <Link to="/admin" className="text-primary">Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
