import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import '../css/frontStyle.css'
// import '../assets/css/font.awesome.min.css'

export default function FrontMain() {
  return (
    <>
      <div className="home-wrapper home-1 front-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
