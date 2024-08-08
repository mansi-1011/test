/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="sidebar sidebar-info" id="sidebar">
        <div className="sidebar-content-wrapper sidebar-offcanvas">
          <ul className="nav">
            <li
              className={`nav-item ${
                pathname === "/admin/dashboard" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to={"/admin/dashboard"}>
                {/* <i><FontAwesomeIcon icon={faGaugeSimple} /></i> */}
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                pathname === "/admin/user" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to={"/admin/user"}>
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <span className="menu-title">User</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                pathname === "/admin/category" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to={"/admin/category"}>
                {/* <FontAwesomeIcon icon={faBullhorn} /> */}
                <span className="menu-title">Category</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                pathname === "/admin/subcategory" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to={"/admin/subcategory"}>
                {/* <FontAwesomeIcon icon={faBullhorn} /> */}
                <span className="menu-title">Sub Category</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                pathname === "/admin/product" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to={"/admin/product"}>
                {/* <FontAwesomeIcon icon={faBullhorn} /> */}
                <span className="menu-title">Product</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
