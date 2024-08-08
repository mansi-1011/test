import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/* -------------- admin  -------------- */

import Main from './component/admin/layout'
import Dashboard from './pages/admin/Dashboard'
import User from "./pages/admin/User";
import Login from "./pages/admin/Login";
import Registration from "./pages/admin/Registration";
import Auth from "./pages/admin/Auth";
import Category from "./pages/admin/Category";
import SubCategory from "./pages/admin/SubCategory";
import Product from "./pages/admin/Product";

/* -------------- Frontend  -------------- */

import FrontMain from "./component/frontend/layout";
import Home from "./pages/frontend/Home";
import Shop from "./pages/frontend/Shop";
import ProductDetails from "./pages/frontend/ProductDetails";
import Cart from "./pages/frontend/Cart";
import CheckOut from "./pages/frontend/CheckOut";
import FLogin from "./pages/frontend/FLogin";
import Register from "./pages/frontend/Register";
import UseAuth from "./component/frontend/layout/UseAuth";
import OrderConfirm from "./pages/frontend/OrderConfirm";
import Contact from "./pages/frontend/Contact";
import AboutUs from "./pages/frontend/AboutUs";
import Categories from "./pages/frontend/Categories";
import Products from "./pages/frontend/Products";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      {/* -------------- Frontend  --------------  */}

      <Routes>
        <Route path='' element={<FrontMain />}>
          <Route path='' element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='product-details/:slug_name' element={<ProductDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='login' element={<FLogin />} />
          <Route path='register' element={<Register />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='Categories' element={<Categories />} />
          <Route path='product/:slug_name' element={<Products />} />
        </Route>
        <Route path='' element={<UseAuth><FrontMain /></UseAuth>}>
          <Route path='checkout' element={<CheckOut />} />
          <Route path='orderconfirmed' element={<OrderConfirm />} />
        </Route>
        { /* -------------- Admin  -------------- */}

        <Route path="registration" element={<Registration />} />
        <Route path='/admin' element={<Login />} />
        <Route path='/admin' element={<Auth><Main /></Auth>} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user' element={<User />} />
          <Route path='category' element={<Category />} />
          <Route path='subcategory' element={<SubCategory />} />
          <Route path='product' element={<Product />} />
          <Route path='cart' element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
