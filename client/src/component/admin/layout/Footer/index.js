import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-center text-sm-left d-block d-sm-inline-block">
            Copyright © 2022
            <a
              href="https://kgkrunch.com/"
              target="_blank"
              rel="noreferrer"
              className="ml-1"
            >
              KgKrunch
            </a>
            . All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
