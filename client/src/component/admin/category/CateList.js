/* eslint-disable jsx-a11y/anchor-is-valid */
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

export default function UserList({
  cateState,
  editHandle,
  getCategory,
  setSelectionModel,
  selectionModel,
  ...props
}) {
  const data = cateState;
  const dispatch = useDispatch();
  function deletehandle(id) {
    Axios.delete(
      `${env.API_URL}/cate/del`,
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
          // Axios.delete(`${env.API_URL}/subcate/delbycategory`,{ data: { id: id } }, {
          //   headers: {
          //     "x-access-token": localStorage.getItem("user") || "",
          //   },
          // })
          //   .then((res) => {
          //     if (res.data.status) {
          //       dispatch(
          //         setToast({ type: "success", message: res.data.message })
          //       );
          //     } else {
          //       dispatch(
          //         setToast({ type: "error", message: res.data.message })
          //       );
          //     }
          //   })
          //   .catch((error) => {
          //     dispatch(setToast({ type: "error", message: error.message }));
          //   });
          getCategory();
          dispatch(setToast({ type: "success", message: res.data.message }));
        } else {
          dispatch(setToast({ type: "error", message: res.data.message }));
        }
      })
      .catch((error) => {
        dispatch(setToast({ type: "error", message: error.message }));
      });
  }

  const columns = [
    {
      name: "Images",
      selector: (row) => row.images,
      sortable: true,
      cell: (d) => (
        <img
          src={`${env.API_URL + "/" + d.images.path}`}
          alt="user Image"
          height={80}
          width={80}
        />
      ),
    }, // renderCell will render the component
    {
      name: "Category Name",
      selector: (row) => row.category_name,
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
                editHandle(d);
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
      {/* <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(rows) => {
          setSelectionModel(rows);
        }}
        selectionModel={selectionModel}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      /> */}
      <DataTableExtensions {...tableData}>
        <DataTable
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}
