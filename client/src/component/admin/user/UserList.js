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
  userState,
  editHandle,
  getUser,
  setSelectionModel,
  selectionModel,
  ...props
}) {
  const data = userState;
  const dispatch = useDispatch();

  // const onChange = async (e) => {
  // var searchData = movies.filter((item) => {
  //   if (
  //     item.title
  //       .toString()
  //       .toLowerCase()
  //       .includes(e.target.value.toLowerCase())
  //   ) {
  //     return item;
  //   }
  // });
  // setTableRowsData(searchData);

  function deletehandle(id) {
    Axios.delete(`${env.API_URL}/user/del/${id}`, {
      headers: {
        "x-access-token": localStorage.getItem("user") || "",
      },
    })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status) {
          dispatch(
            setToast({
              type: "success",
              message: res.data.message,
            })
          );
          getUser();
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

  const columns = [
    {
      name: "Images",
      selector: (row) => row.images,
      cell: (d) => {
        return d.images ? (
          <img
            src={`${env.API_URL + "/" + d.images.path}`}
            alt="user Image"
            height={80}
            width={80}
          />
        ) : (
          ""
        );
      },
      // console.log(d)
    }, // renderCell will render the component
    {
      name: "User name",
      selector: (row) => row.username,
      sortable: true,
      cell: (d) => {
        return <div>{d.username}</div>;
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
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
      <DataTableExtensions {...tableData}>
        <DataTable
          Header
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          // sortIcon={<FontAwesomeIcon icon={faSquare} />}
        />
      </DataTableExtensions>
    </div>
  );
}
