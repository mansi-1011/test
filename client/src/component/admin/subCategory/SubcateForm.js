import React, { useState } from "react";
import Axios from "axios";
import env from "../../../env.json";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { setToast } from "../../../redux/slices/ToastSlice";

export default function SubcateForm({
  category,
  getSubCategory,
  upSubCateForm,
}) {
  const [inputState, setInputState] = useState(upSubCateForm || "");
  const formUpd = upSubCateForm._id ? true : false;
  const _id = upSubCateForm._id || "";
  const [subcategory_images, setImageState] = useState("");
  const [error, setErrors] = useState({});
  const dispatch = useDispatch();

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

  const onClickCloseImages = (e, index) => {
    setImageState();
  };

  function onSubmit(e) {
    Object.assign(inputState, { subcategory_images: subcategory_images });

    if (!formUpd) {
      /*------------ Code For Add Sub Category Data Start ------------ */

      Axios.post(`${env.API_URL}/subcate/addsubcate`, inputState, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getSubCategory();
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Add Sub Category Data End ------------ */
    } else {
      /*------------ Code For Update Sub Category Data Start ------------ */

      Axios.put(`${env.API_URL}/subcate/upd/${_id}`, inputState, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getSubCategory();
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Update Sub Category Data End ------------ */
    }
  }

  return (
    <>
      <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Category</label>
          <Controller
            name="category_id"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.category_id || ""}
            render={({ field: { onChange, ...field } }) => (
              <select
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
                value={inputState.category_id}
                className={`js-example-basic-single ${
                  errors.category_id ? "is-invalid" : ""
                }`}
                name="category_id"
                style={{ width: "100%" }}
              >
                <option defaultValue="">Please select...</option>
                {category.map((item, i) => (
                  <option key={`cate${i}`} value={item._id}>
                    {item.category_name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.category_id ? (
            <span className="text-danger"> {errors.category_id?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Sub Category Name</label>
          <Controller
            name="subcategory_name"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.subcategory_name || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
                value={inputState.subcategory_name || ""}
                type="text"
                className={`form-control ${
                  errors.subcategory_name ? "is-invalid" : ""
                }`}
                id="exampleInputUsername1"
                name="subcategory_name"
                placeholder="Enter Category Name"
              />
            )}
          />
          {errors.subcategory_name ? (
            <span className="text-danger">
              {errors.subcategory_name?.message}
            </span>
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
              {upSubCateForm.subcategory_images ? (
                <img
                  src={`${
                    env.API_URL + "/" + inputState.subcategory_images.path
                  }`}
                  alt="images"
                  className="js--product-image-preview"
                />
              ) : (
                ""
              )}
              {subcategory_images ? (
                <>
                  <div
                    style={{
                      backgroundImage: subcategory_images
                        ? `url('${URL.createObjectURL(subcategory_images)}')`
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
            inputState.subcategory_images || subcategory_images
              ? "form-button"
              : ""
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
