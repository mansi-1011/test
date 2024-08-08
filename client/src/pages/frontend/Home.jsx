import React from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slices/ToastSlice'
import env from '../../env.json'
import Slider1 from '../../component/frontend/Slider/Slider1'
import Slider2 from '../../component/frontend/Slider/Slider2'
// import BlogSlider from '../../component/frontend/Slider/BlogSlider'
import MainSlider from '../../component/frontend/Slider/MainSlider'
import Content from '../../component/frontend/Slider/Content'
import Banner from '../../component/frontend/Slider/Banner'
// import OfferBlog from '../../component/frontend/Slider/OfferBlog'
import { setCategory, setProducts } from '../../redux/slices/ProductsSlice';
import { useCallback } from 'react';
import { getApiData } from '../../helper/Helper';

export default function Home() {

    const dispatch = useDispatch();
    const firstRenderRef = useRef(true);
    const fetchProduct = useCallback(() => {
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

    }, [dispatch])
    const fetchCategory = useCallback(() => {
        getApiData(`${env.API_URL}/product/getcate`)
            .then(
                res => {
                    if (res.data.status) {
                        dispatch(setCategory(res.data.category))
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

    },[dispatch]);
    
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return
        }
        fetchProduct();
        fetchCategory();
    }, [fetchProduct , fetchCategory])
    return (
        <>
            <MainSlider />
            <Content />
            <Slider1 />
            <Banner />
            <Slider2 />
            {/* <OfferBlog /> */}
            {/* <BlogSlider /> */}
        </>
    )
}
