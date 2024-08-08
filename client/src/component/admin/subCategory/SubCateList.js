/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Axios from "axios";
import env from "../../../env.json";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/slices/ToastSlice";

export default function SubCateList({
  editHandle,
  setSelectionModel,
  selectionModel,
  getSubCategory,
  subCate,
}) {
  const data = subCate;
  const dispatch = useDispatch();
  function deletehandle(id) {
    if (id !== null) {
      Axios.delete(
        `${env.API_URL}/subcate/del`,
        { data: { id: id } },
        {
          headers: {
            "x-access-token": localStorage.getItem("user") || "",
          },
        }
      )
        .then((res) => {
          alert(res.data.message);
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
    }
  }
  const columns = [
    {
      name: "Images",
      selector: (row) => row.subcategory_images,
      cell: (d) => (
        <img
          src={`${env.API_URL + "/" + d.subcategory_images.path}`}
          alt="user Image"
          height={80}
          width={80}
        />
      ),
    }, // renderCell will render the component
    {
      name: "Category Name",
      selector: (row) => row.category_id,
      sortable: true,
      cell: (d) => {
        return <div>{d.category_id.category_name}</div>;
      },
    },
    {
      name: "Subcategory Name",
      selector: (row) => row.subcategory_name,
      sortable: true,
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
