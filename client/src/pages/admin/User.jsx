import React, { useState, useEffect, useCallback } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import env from '../../env.json'
import UserForm from '../../component/admin/user/UserForm';
import UserList from '../../component/admin/user/UserList';
import { setToast } from '../../redux/slices/ToastSlice';


export default function User() {
    const [userState, setUserState] = useState([]);
    const [userFormState, setUserFromState] = useState(false);
    const [upUserFormState, setUpUserFormState] = useState({});
    const [selectionModel, setSelectionModel] = React.useState([]);
    const dispatch = useDispatch();
    const formToggle = () => {
        setUserFromState(!userFormState)
        setUpUserFormState({})
    }

    const editHandle = (userData) => {
        setUpUserFormState(userData)
        setUserFromState(true)
    }



    const getUser = useCallback(() => {
        Axios.get(`${env.API_URL}/user`, {
            headers: {
                'x-access-token': localStorage.getItem('user') || '',
            }
        })
            .then(
                res => {
                    if (res.data.status) {
                        setUserState(res.data.user)
                        dispatch(setToast({ type: "success", message: res.data.message }))
                    } else {
                        dispatch(setToast({ type: "error", message: res.data.message }))
                    }
                }).catch(error => {
                    dispatch(setToast({ type: "error", message: error.message }))
                })

    }, [dispatch])

    useEffect(() => {
        getUser();
    }, [getUser])

    const onMultipleDelete = () => {
        if (selectionModel.length !== 0) {
            Axios.delete(`${env.API_URL}/user/mlpdelete`, { data: { id: selectionModel } }, {
                headers: {
                    "x-access-token": localStorage.getItem("user") || "",
                },
            })
                .then(res => {
                    if (res.data.status) {
                        getUser();
                        dispatch(setToast({ type: "success", message: res.data.message }))
                    }
                    else {
                        dispatch(setToast({ type: "error", message: res.data.message }))
                    }
                }).catch(error => {
                    dispatch(setToast({ type: "error", message: error.message }))
                })
        }
    }

    return (
        <>
            {/* <div className="page-header">
                <h3 className="page-title"> {!userFormState ? 'User List' : 'User Form'} </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/admin/user`}>User</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{!userFormState ? 'List' : 'Form'} </li>
                    </ol>
                </nav>
            </div> */}
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex">
                            <div className="fs-5">
                                <h4 className="card-title">{!userFormState ? 'User Table' : 'User Form'}</h4>
                            </div>
                            {!userFormState ?
                                <button onClick={(e) => { e.preventDefault(); formToggle(); }} className={`btn btn-sm ms-auto btn-info`}>
                                    <FontAwesomeIcon icon={faPlus} /> Add
                                </button>
                                :
                                <button onClick={(e) => { e.preventDefault(); formToggle(); }} className={`btn btn-sm ms-auto btn-success`}>
                                    <FontAwesomeIcon icon={faList} /> List
                                </button>
                            }
                            {
                                !userFormState ?
                                    <button className={`btn btn-sm ms-2 btn-danger`} onClick={(e) => onMultipleDelete(e)}>
                                        Delete
                                    </button>
                                    :
                                    ''

                            }
                        </div>
                        {
                            !userFormState ?
                                <UserList editHandle={editHandle} setSelectionModel={setSelectionModel} selectionModel={selectionModel} userState={userState} getUser={getUser} />
                                :
                                <UserForm getUser={getUser} upUserFormState={upUserFormState} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
