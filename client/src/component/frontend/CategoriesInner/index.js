import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import env from "../../../env.json";


export default function CategoriesInner() {
  const categories = useSelector((state) => state.product.category);
  return (
    <>
      <div className="shop-main-area  shop-fullwidth">
        <div className="container container-default custom-area">
          <div className="row flex-row-reverse">
            <div className="col-12 col-custom widget-mt">
              <div className="row shop_wrapper grid_4">
                {categories && categories.length ? (
                  categories.map((item, i) => (
                    <div
                      key={`shop-${i}`}
                      className="col-md-6 col-sm-6 col-lg-4 col-custom product-area"
                    >
                      <div className="single-product position-relative">
                        <div className="product-image">
                          <Link to={`/product/${item.category_name}`}>
                            <img
                              src={env.API_URL + "/" + item.images.path}
                              alt={item.category_name}
                              className="product-image-1"
                              width={200}
                              height={200}
                            />
                          </Link>
                        </div>
                        <div className="product-content">
                          <div className="product-rating"></div>
                          <div className="product-title">
                            <h4 className="title-2">
                              <Link to={`/product/${item.category_name}`}>
                                {item.category_name}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="row shop_wrapper grid_4">
                    <div className="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
                      <div className="single-product position-relative">
                        <p className="alert alert-success">
                          {" "}
                          No Have Products{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
