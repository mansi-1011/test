/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Axios from "axios";
import env from "../../../env.json";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/slices/ToastSlice";
import { useForm, Controller } from "react-hook-form";

export default function ProductForm({
  category,
  subCate,
  prdFormState,
  getProduct,
  setPrdFromState,
  upPrdFormState,
  ...props
}) {
  const [inputState, setInputState] = useState(upPrdFormState || "");
  const formUpd = upPrdFormState._id ? true : false;
  const _id = upPrdFormState._id || "";
  const [product_images, setImageState] = useState([]);
  const [error, setErrors] = useState({});

  const dispatch = useDispatch();
  // const fileInput = React.createRef();
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
  console.log(inputState);
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
    } else if (e.target.files.length > 12) {
      setErrors({
        files: "maximum limit 12",
      });
    } else {
      const { files } = e.target;
      const file = [];
      for (let i = 0; i < files.length; i++) {
        file.push(files[i]);
      }
      setImageState(file);
      setErrors({ files: "" });
    }
  };

  const onClickCloseImages = (e, index) => {
    const arr = product_images.filter((_img, i) => i !== index);
    setImageState(arr);
  };

  function onSubmit(e) {
    var formData = new FormData();
    for (let i = 0; i < product_images.length; i++) {
      if (product_images[i]) {
        formData.append("product_images", product_images[i]);
      }
    }
    for (const [key, value] of Object.entries(inputState)) {
      formData.append(key, value);
    }

    if (!formUpd) {
      /*------------ Code For Add Product Data Start ------------ */

      Axios.post(`${env.API_URL}/product/addproduct`, formData, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getProduct();
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Add Product Data End ------------ */
    } else {
      /*------------ Code For Update Product Data Start ------------ */

      Axios.put(`${env.API_URL}/product/upd/${_id}`, formData, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            getProduct();
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
      /*------------ Code For Update Product Data End ------------ */
    }
  }

  const onClickDeleteImage = (e, id) => {
    if (id) {
      Axios.delete(`${env.API_URL}/product/delImg/${_id}/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
        },
      })
        .then((res) => {
          if (res.data.status) {
            setInputState({
              ...inputState,
              product_images: res.data.product_images,
            });
            var tmpimgs = inputState.product_images;
            const count = res.data.product_images.length;
            tmpimgs.splice(tmpimgs.length - count, count);
            setImageState(tmpimgs);
            dispatch(setToast({ type: "success", message: res.data.message }));
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
    }
  };

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
          <label>Sub Category</label>
          <Controller
            name="subcategory_id"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.subcategory_id || ""}
            render={({ field: { onChange, ...field } }) => (
              <select
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
                value={inputState.subcategory_id}
                className={`js-example-basic-single ${
                  errors.subcategory_id ? "is-invalid" : ""
                }`}
                name="subcategory_id"
                style={{ width: "100%" }}
              >
                <option defaultValue="">Please select...</option>
                {subCate.map((item, i) => (
                  <option key={`subcate${i}`} value={item._id}>
                    {item.subcategory_name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.subcategory_id ? (
            <span className="text-danger">
              {errors.subcategory_id?.message}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.status || ""}
            render={({ field: { onChange, ...field } }) => (
              <select
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
                value={inputState.status}
                className={`js-example-basic-single ${
                  errors.status ? "is-invalid" : ""
                }`}
                name="status"
                style={{ width: "100%" }}
              >
                <option defaultValue="">Please select...</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
            )}
          />
          {errors.status ? (
            <span className="text-danger"> {errors.status?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Product Name</label>
          <Controller
            name="product_name"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.product_name || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
                value={inputState.product_name || ""}
                type="text"
                className={`form-control ${
                  errors.product_name ? "is-invalid" : ""
                }`}
                id="exampleInputUsername1"
                name="product_name"
                placeholder="Enter Category Name"
              />
            )}
          />
          {errors.product_name ? (
            <span className="text-danger"> {errors.product_name?.message}</span>
          ) : (
            ""
          )}
        </div>
        {/* <div className="form-group">
          <label htmlFor="exampleInputUsername1">Brand</label>
          <Controller
            name="brand"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.brand || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                onChange={(e) => (onChange(e), handleChange(e))}
                value={inputState.brand || ""}
                type="text"
                className={`form-control ${errors.brand ? "is-invalid" : ""}`}
                id="exampleInputUsername1"
                name="brand"
                placeholder="Enter Category Name"
              />
            )}
          />
          {errors.brand ? (
            <span className="text-danger"> {errors.brand?.message}</span>
          ) : (
            ""
          )}
        </div> */}
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">descriptions</label>
          <Controller
            name="description"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.description || ""}
            render={({ field: { onChange, ...field } }) => (
              <textarea
                type="text"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                value={inputState.description || ""}
                id="exampleInputUsername1"
                name="description"
                placeholder="Enter Description"
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              ></textarea>
            )}
          />
          {errors.description ? (
            <span className="text-danger"> {errors.description?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Color</label>
          <Controller
            name="color"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.color || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                type="text"
                className={`form-control ${errors.color ? "is-invalid" : ""}`}
                id="exampleInputUsername1"
                name="color"
                placeholder="Enter Color"
                value={inputState.color || ""}
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              />
            )}
          />
          {errors.color ? (
            <span className="text-danger"> {errors.color?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Weight</label>
          <Controller
            name="weight"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.weight || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                type="text"
                className={`form-control ${errors.weight ? "is-invalid" : ""}`}
                id="exampleInputUsername1"
                name="weight"
                placeholder="Enter Color"
                value={inputState.weight || ""}
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              />
            )}
          />
          {errors.weight ? (
            <span className="text-danger"> {errors.weight?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">price</label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.price || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                type="number"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                id="exampleInputUsername1"
                name="price"
                placeholder="Enter Color"
                value={inputState.price || ""}
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              />
            )}
          />
          {errors.price ? (
            <span className="text-danger"> {errors.price?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Sku</label>
          <Controller
            name="sku"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.sku || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                type="text"
                className={`form-control ${errors.sku ? "is-invalid" : ""}`}
                id="exampleInputUsername1"
                name="sku"
                placeholder="Enter Color"
                value={inputState.sku || ""}
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              />
            )}
          />
          {errors.sku ? (
            <span className="text-danger"> {errors.sku?.message}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Quantity Per Unit</label>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            defaultValue={inputState.quantity || ""}
            render={({ field: { onChange, ...field } }) => (
              <input
                type="number"
                className={`form-control ${
                  errors.quantity ? "is-invalid" : ""
                }`}
                id="exampleInputUsername1"
                name="quantity"
                placeholder="Enter Color"
                value={inputState.quantity || ""}
                {...field}
                onChange={(event) => {
                  onChange(event);
                  handleChange(event);
                }}
              />
            )}
          />
          {errors.quantity ? (
            <span className="text-danger"> {errors.quantity?.message}</span>
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
                  multiple
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
            {_id
              ? inputState.product_images?.map((item, i) => (
                  <React.Fragment key={`product-images${i}`}>
                    <div className="col-md-2">
                      <img
                        src={`${env.API_URL + "/" + item.path}`}
                        alt="images"
                        className="js--product-image-preview"
                        height={100}
                        width={100}
                      />
                      <div
                        onClick={(e) => {
                          onClickDeleteImage(e, item._id);
                        }}
                        className="product-active"
                      ></div>
                    </div>
                  </React.Fragment>
                ))
              : product_images?.map((item, i) => (
                  <React.Fragment key={`${item.name}`}>
                    <div className="col-md-2">
                      <div
                        style={{
                          backgroundImage: product_images
                            ? `url('${URL.createObjectURL(product_images[i])}')`
                            : "none",
                        }}
                        className="js--product-image-preview"
                      ></div>
                      <div
                        onClick={(e) => {
                          onClickCloseImages(e, i);
                        }}
                        className="product-active"
                      ></div>
                    </div>
                  </React.Fragment>
                ))}
          </div>
        </div>
        <div
          className={`form-group ${
            inputState.product_images || product_images ? "" : "form-button"
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
