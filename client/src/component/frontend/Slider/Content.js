import React from "react";
import feature1 from '../../../images/img/feature/feature-1.jpg'

export default function Features() {
  return (
    <div className="feature-area">
      <div className="container container-default custom-wrapper">
        <div className="row">
          <div className="col-xl-6 col-lg-5 col-md-12 col-custom">
            <div className="feature-content-wrapper">
              <h2 className="title">Important to eat fruit</h2>
              <p className="desc-content">
                Eating fruit provides health benefits — people who eat more
                fruits and vegetables as part of an overall healthy diet are
                likely to have a reduced risk of some chronic diseases. Fruits
                provide nutrients vital for health and maintenance of your body.
              </p>
              <p className="desc-content">
                Fruits are sources of many essential nutrients that are
                underconsumed, including potassium, dietary fiber, vitamin C,
                and folate (folic acid).
              </p>
              <p className="desc-content">
                Most fruits are naturally low in fat, sodium, and calories. None
                have cholesterol.
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7 col-md-12 col-custom">
            <div className="feature-image">
              <img src={feature1} alt="Obrien Feature" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
