/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminsetIsLoggedIn,
  AdminsetUser,
} from "../../../../redux/slices/AdminUserSlice";
import env from "../../../../env.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../../../images/img/logo/kgkruch.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.adminUser.user);

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = (e) => {
    if (window.confirm("Sure want to log out?")) {
      localStorage.clear();
      dispatch(AdminsetIsLoggedIn(false));
      dispatch(AdminsetUser({}));
      routeChange("/admin");
    }
  };
  return (
    <>
      <nav className="navbar p-0 d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="ti-align-left"></span>
          </button>
          <div className="navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <Link className="navbar-brand brand-logo" to={""}>
              <img src={LogoImg} alt="logo" />
            </Link>
            <Link className="navbar-brand brand-logo-mini" to={""}>
              <img src={LogoImg} alt="logo" />
            </Link>
          </div>
          <ul className="navbar-nav navbar-nav-right ml-auto">
            <li className="nav-item nav-profile dropdown">
              {/* <a class="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                  <div class="navbar-profile">
                    <img class="img-xs rounded-circle" src="../assets/images/faces/face15.jpg" alt="">
                    <p class="mb-0 d-none d-sm-block navbar-profile-name">Henry Klein</p>
                    <i class="mdi mdi-menu-down d-none d-sm-block"></i>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                  <h6 class="p-3 mb-0">Profile</h6>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <div class="preview-icon bg-dark rounded-circle">
                        <i class="mdi mdi-settings text-success"></i>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <p class="preview-subject mb-1">Settings</p>
                    </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <div class="preview-icon bg-dark rounded-circle">
                        <i class="mdi mdi-logout text-danger"></i>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <p class="preview-subject mb-1">Log out</p>
                    </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <p class="p-3 mb-0 text-center">Advanced settings</p>
                </div> */}

              <a
                className="nav-link"
                href="#"
                data-bs-toggle="dropdown"
                id="profileDropdown"
              >
                {User.image ? (
                  <img
                    className="profile-pic"
                    src={`${env.API_URL + "/" + User.image.path}`}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <button href="#" className="dropdown-item">
                  <FontAwesomeIcon icon={faGear} className="text-success" />
                  Settings
                </button>
                <button
                  className="dropdown-item"
                  onClick={(e) => handleLogout(e)}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-danger"
                  />
                  Logout
                </button>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="ti-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
