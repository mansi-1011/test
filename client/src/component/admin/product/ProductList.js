/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import env from "../../../env.json";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/slices/ToastSlice";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function ProductList({
  productState,
  editHandle,
  setSelectionModel,
  selectionModel,
  getProduct,
  ...props
}) {
  const data = productState;
  const dispatch = useDispatch();
  function deletehandle(id) {
    if (id !== null) {
      Axios.delete(`${env.API_URL}/product/del/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("user") || "",
        },
      })
        .then((res) => {
          alert(res.data.message);
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
    }
  }
  const columns = [
    {
      name: "Image",
      selector: (row) => row.product_images,
      sortable: true,
      cell: (d) => (
        // console.log(params)
        <div className="row">
          {d.product_images.map((item, i) => {
            return (
              <div key={i} className="col-lg-2">
                <img
                  src={`${env.API_URL + "/" + item.path}`}
                  alt="product Image"
                  height={50}
                  width={50}
                />
              </div>
            );
          })}
        </div>
      ),
    },
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row.category_id,
      cell: (d) => {
        return (
          <div>{d.category_id.category_name}</div>
        );
      },
    }, // renderCell will render the component
    {
      name: "SubCategory Name",
      sortable: true,
      selector: (row) => row.subcategory_id,
      cell: (d) => {
        return (
          <div>
            {d.subcategory_id.subcategory_name}
          </div>
        );
      },
    }, // renderCell will render the component
    {
      name: "Product Name",
      sortable: true,
      selector: (row) => row.product_name,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Action",
      cell: (d) => {
        return (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                editHandle(d._id);
              }}
              className="btn btn-sm btn-success me-2"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                deletehandle(d._id);
              }}
              className="btn btn-sm btn-danger me-2"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        );
      },
    },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="mt-3">
      <DataTableExtensions {...tableData}>
        <DataTable
          Header
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}
