import React, { useState } from "react";
import Axios from "axios";
import env from "../../../env.json";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/slices/ToastSlice";
import { useForm, Controller } from "react-hook-form";

export default function CateForm({ getCategory, upCateFormState }) {
  const formUpd = upCateFormState._id ? true : false;
  const _id = upCateFormState._id || "";
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState(upCateFormState || "");
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

  const onClickCloseImages = () => {
    setImageState();
  };

  function onSubmit() {
    Object.assign(inputState, { images: images });
    if (!formUpd) {
      /*------------ Code For Add Category Data Start ------------ */

      Axios.post(`${env.API_URL}/cate/addcate`, inputState, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getCategory();
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Add Category Data End ------------ */
    } else {
      /*------------ Code For Update Category Data Start ------------ */

      Axios.put(`${env.API_URL}/cate/upd/${_id}`, inputState, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getCategory();
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Update Category Data End ------------ */
    }
  }

  return (
    <>
      <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Category Name</label>
          <Controller
            name="category_name"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.category_name || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                type="text"
                className={`form-control ${
                  errors.category_name ? "is-invalid" : ""
                }`}
                id="exampleInputUsername1"
                name="category_name"
                placeholder="Category Name"
                value={inputState.category_name || ""}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              />
            )}
          />
          {errors.category_name ? (
            <span className="text-danger">{errors.category_name?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>File upload</label>
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
        <div className="form-group">
          <div className="row">
            <div className="col-md-2">
              {inputState.images ? (
                <img
                  src={`${env.API_URL + "/" + inputState.images.path}`}
                  className="js--image-preview"
                  alt="img"
                />
              ) : (
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
          <button
            type="submit"
            // onClick={(e) => onSubmit(e)}
            className="btn btn-primary "
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
