import React, { useState } from "react";
import Axios from "axios";
import env from "../../../env.json";
import { setToast } from "../../../redux/slices/ToastSlice";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

export default function UserForm({ upUserFormState, getUser, ...props }) {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState(upUserFormState || "");
  const formUpd = upUserFormState._id ? true : false;
  const _id = upUserFormState._id || "";
  const [images, setImageState] = useState();
  const [error, setErrors] = useState({});

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

  const handleChangeImage = (e) => {
    const fileExtension = e.target.files[0].type;
    const allowedFileTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(fileExtension)) {
      setErrors({
        files: "only include jpe , png, jpeg images",
      });
    } else if (e.target.files[0].size > 5000000) {
      setErrors({
        files: "only add 5MB size image",
      });
    } else {
      setImageState(e.target.files[0]);
      setErrors({ files: "" });
    }
  };

  const onClickCloseImages = (e) => {
    setImageState();
  };

  function onSubmit() {
    Object.assign(inputState, { images: images });

    if (!formUpd) {
      /*------------ Code For Add User Data Start ------------ */
      Axios.post(`${env.API_URL}/user/register`, inputState, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getUser();
            dispatch(
              setToast({
                type: "success",
                message: res.data.message,
              })
            );
          } else {
            dispatch(
              setToast({
                type: "error",
                message: res.data.message,
              })
            );
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Add User Data End ------------ */
    } else {
      /*------------ Code For Update User Data Start ------------ */

      Axios.put(`${env.API_URL}/user/upd/${_id}`, inputState, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getUser();
            dispatch(
              setToast({
                type: "success",
                message: res.data.message,
              })
            );
          } else {
            dispatch(
              setToast({
                type: "error",
                message: res.data.message,
              })
            );
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
    }
    /*------------ Code For Update User Data End ------------ */
  }

  return (
    <>
      <form
        className="forms-sample"
        autoComplete="false"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Username</label>
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
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
                value={inputState.username || ""}
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                id="exampleInputUsername1"
                name="username"
                placeholder="Enter Category Name"
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
          <label htmlFor="exampleInputEmail1">Email address</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
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
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="exampleInputUsername1"
                name="email"
                placeholder="Enter Category Name"
              />
            )}
          />
          {errors.email ? (
            <span className="text-danger">{errors.email?.message}</span>
          ) : (
            ""
          )}
        </div>
        {!formUpd ? (
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required." },
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
                  type="text"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="exampleInputUsername1"
                  name="password"
                  placeholder="Enter Category Name"
                />
              )}
            />
            {errors.password ? (
              <span className="text-danger">{errors.password?.message}</span>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        <div className="form-group">
          <label>File upload</label>
          <div className="input-group col-xs-12">
            <div className="input-group col-xs-12">
              <Controller
                name="files"
                // rules={{
                //   required: { value: true, message: "This Field is Required." },
                // }}
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    {...field}
                    onChange={(event) => {
                      onChange(event);
                      handleChangeImage(event);
                    }}
                    type="file"
                    name="files"
                    className={`form-control file-upload-info ${
                      error.files ? "is-invalid" : " "
                    }`}
                    placeholder="Upload Image"
                  />
                )}
              />
            </div>
            {error.files ? (
              <span className="text-danger"> {error.files}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-2">
              {inputState.images !== undefined ? (
                <img
                  src={`${env.API_URL + "/" + inputState.images.path}`}
                  alt="images"
                  className="js--image-preview"
                />
              ) : (
                // <div
                //   style={{
                //     backgroundImage: `url('${
                //       env.API_URL + "/" + inputState.images.path
                //     }')`,
                //   }}
                //   className="js--image-preview"
                // ></div>
                ""
              )}
              {images ? (
                <>
                  <div
                    style={{
                      backgroundImage: images
                        ? `url('${URL.createObjectURL(images)}')`
                        : "none",
                    }}
                    className="js--image-preview"
                  ></div>
                  <div
                    onClick={(e) => {
                      onClickCloseImages(e);
                    }}
                    className="active"
                  ></div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className={`form-group ${
            inputState.images || images ? "form-button" : ""
          }`}
        >
          <button type="submit" className="btn btn-gradient-primary mr-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
