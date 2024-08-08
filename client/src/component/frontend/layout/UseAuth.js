
import React, {useEffect } from "react";
import Axios from "axios";
import env from "../../../env.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../redux/slices/UserAuthSlice";
// import { setIsLoggedIn } from '../../../redux/slices/ContUserSlice'

export default function UseAuth({ children }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const ContUser = useSelector(state => state.contUser.isLoggedIn)
  // console.log(ContUser, 'ContUser');

  const ChkAdmin = React.useCallback(() => {
    Axios.get(`${env.API_URL}/customer/useauth`, {
      headers: {
        "x-access-token": localStorage.getItem("userAuth") || "",
      },
    })
      .then((res) => {
        if (res.data.customer) {
          dispatch(setIsLoggedIn(true));
          localStorage.setItem(
            "customeAuth",
            JSON.stringify(res.data.CustomerData)
          );
        } else {
          dispatch(setIsLoggedIn(false));
          navigate("/login");
          // setContUser(false)
        }
      })
      .catch((err) => console.error(err));
  }, [dispatch, navigate]);

  useEffect(() => {
    ChkAdmin();
  }, [ChkAdmin]);
  // return ContUser ? (children) : (<Navigate to={'/signup'} replace state={{ path: location.pathname }} />)
  return children;
}
