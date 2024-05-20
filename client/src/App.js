import { Outlet, Route, Routes } from "react-router-dom";
import './styles.css'
import Home from "./client/pages/Home";
import Products from "./client/pages/Products";
import Product from "./client/pages/Product";

import CheckOut from "./client/pages/Users/CheckOut";
import Address from "./client/pages/Users/Address";
import OrderReceived from "./client/pages/Users/OrderReceived";
import PersonalInformation from "./client/pages/Users/PersonalInformation";
import PaymentInformation from "./client/pages/Users/PaymentInformation";
import ShipmentAddress from "./client/pages/Users/ShipmentAddress";
import Logout from "./client/pages/Users/Logout";
import NotFound from "./client/pages/NotFound";
import ContactUs from "./client/pages/ContactUs";
import Join from "./client/pages/Join";
import Register from "./client/pages/Register";
import ForgotPassword from "./client/pages/ForgotPassword";
import AboutUs from "./client/pages/AboutUs";
import ValidateOTP from "./client/pages/ValidateOTP";


// admin pages
import Dashboard from './admin/pages/DashBoard'
import Customers from './admin/pages/Customers'
import Categories from "./admin/pages/Categories";
import Inventory from "./admin/pages/Inventory";
import ProductCreateEdit from "./admin/pages/ProductCreateEdit";





function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="products/" element={<Products/>}/>
      <Route path="products/:query" element={<Products/>}/>
      <Route path="product/:id" element={<Product/>}/>
      <Route path="join">
        <Route path="/join" element={<Join/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="validate-otp" element={<ValidateOTP/>}/>
      </Route>
      <Route path="about-us" element={<AboutUs/>}/>
      <Route path="contact-us" element={<ContactUs/>}/>

      {/* Routes for user  */}
      <Route path="/user" element={<Outlet/>}>
        <Route path="check-out" element={<CheckOut/>}/>
        <Route path="address" element={<ShipmentAddress/>}/>
        <Route path="order-received" element={<OrderReceived/>}/>

        <Route path="edit-personal-information" element={<PersonalInformation/>}/>
        <Route path="edit-payment-information" element={<PaymentInformation/>}/>
        <Route path="edit-address-information" element={<Address/>}/>
        <Route path="logout" element={<Logout/>}/>
      </Route>

      {/* Routes for admin */}
      <Route path="/admin" element={<Outlet/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="categories" element={<Categories/>}/>
        <Route path="inventory" element={<Inventory/>}/>
        <Route path="inventory/product/:id?" element={<ProductCreateEdit/>}/>
        <Route path="customers" element={<Customers/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
