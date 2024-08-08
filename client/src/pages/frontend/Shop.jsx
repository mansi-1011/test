
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import env from "../../env.json";
import { setToast } from '../../redux/slices/ToastSlice';
import ShopInner from '../../component/frontend/ShopInner';
import { setCartProduct, setProducts } from '../../redux/slices/ProductsSlice';
import { setMenu, setSubCategory } from '../../redux/slices/MenuSlice';
import { getApiByIdAndName, getApiData } from '../../helper/Helper';

export default function Shop() {
  const firstRenderRef = useRef(true);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [active, setActive] = useState(false);

  const addToCart = (item) => {
    dispatch(setCartProduct(item));
  };

  const onSubcategoryGet = (item) => {
    dispatch(setMenu(item))
  }

  const a = useCallback((id, category_name) => {
    setTitle(category_name);
    setActive(true)
    if (id) {
      getApiByIdAndName(`${env.API_URL}/product/getProduct/`, id)
        .then((res) => {
          if (res.data.status) {
            dispatch(setProducts(res.data.products))
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
    }
    else {
      getApiData(`${env.API_URL}/product/getpro`)
        .then(
          res => {
            if (res.data.status) {
              dispatch(setProducts(res.data.product))
              // dispatch(setToast({ type: "success", message: res.data.message }));
            } else {
              dispatch(setToast({ type: "error", message: res.data.message }));
            }
          }
        )
        .catch(
          error => {
            dispatch(setToast({ type: "error", message: error.message }));
          }
        )
    }
  }, [dispatch]);

  const getSubcategoy = useCallback((id, subcategory_name) => {
    setTitle(subcategory_name);
    if (id) {
      getApiByIdAndName(`${env.API_URL}/product/getSubPro/`, id)
        .then((res) => {
          if (res.data.status) {
            dispatch(setProducts(res.data.products))
            setActive(true)
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
    } else {
      getApiData(`${env.API_URL}/product/getsubcate`)
        .then((res) => {
          if (res.data.status) {
            dispatch(setSubCategory(res.data.subcategory))
          } else {
            dispatch(setToast({ type: "error", message: res.data.message }));
          }
        })
        .catch((error) => {
          dispatch(setToast({ type: "error", message: error.message }));
        });
    }

  }, [dispatch]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    getSubcategoy();
    getProduct();
  }, [getSubcategoy, getProduct]);

  return (
    <>
      <div className="breadcrumbs-area position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="breadcrumb-content position-relative section-content">
                <h3 className="title-3">Shop Fullwidth</h3>
                <ul>
                  <li><Link to="">Home</Link></li>
                  <li>Shop</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShopInner addToCart={addToCart} getSubcategoy={getSubcategoy} onSubcategoryGet={onSubcategoryGet} getProduct={getProduct} title={title} active={active}/* FilterByName={FilterByName} */ />
    </>
  )
}
