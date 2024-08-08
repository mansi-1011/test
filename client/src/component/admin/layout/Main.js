import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../css/style.css";

export default function Main() {
  return (
    <div className="container-scroller admin-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
