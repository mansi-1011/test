import React from 'react'
import { Link } from 'react-router-dom'
import CategoriesInner from '../../component/frontend/CategoriesInner'

export default function Categories() {
    return (
        <>
            <div className="breadcrumbs-area position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="breadcrumb-content position-relative section-content">
                                <h3 className="title-3">Category</h3>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Category</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CategoriesInner />
        </>
    )
}
