import { Route, Routes } from "react-router-dom";
import './styles.css'
import Home from "./client/pages/Home";
import Products from "./client/pages/Products";
import Product from "./client/pages/Product";

import CheckOut from "./client/pages/Users/CheckOut";
import Address from "./client/pages/Users/Address";
import MyOrders from "./client/pages/Users/MyOrders";
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


import RequestOTP from "./client/pages/RequestOTP";
import UpdatePassword from "./client/pages/UpdatePassword";
import PrivateAuthRoute from "./PrivateRoute/PrivateAuthRoute";
import PublicAuthRoute from "./PrivateRoute/PublicAuthRoute";
import Orders from "./admin/pages/Orders";
import OrderReceived from "./client/pages/Users/OrderReceived";
import SingleOrder from "./admin/pages/SingleOrder";
import Settings from "./admin/pages/Settings";
import ContactedUs from "./admin/pages/ContactedUs";





function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="products/:type?/:value?/:category?" element={<Products/>}/>
      <Route path="product/:id" element={<Product/>}/>
      <Route path="join" element={<PublicAuthRoute/>}>
        <Route path="/join" element={<Join/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="validate-otp" element={<ValidateOTP/>}/>
        <Route path="request-otp" element={<RequestOTP/>}/>
        <Route path="update-password" element={<UpdatePassword/>}/>
      </Route>
      <Route path="about-us" element={<AboutUs/>}/>
      <Route path="contact-us" element={<ContactUs/>}/>

      {/* Routes for user  */}
      <Route path="/profile" element={<PrivateAuthRoute/>}>
        
        <Route path="check-out" element={<CheckOut/>}/>
        <Route path="address" element={<ShipmentAddress/>}/>
        <Route path="my-orders" element={<MyOrders/>}/>
        <Route path="order-received/:id" element={<OrderReceived/>}/>

        <Route path="edit-personal-information" element={<PersonalInformation/>}/>
        <Route path="edit-payment-information" element={<PaymentInformation/>}/>
        <Route path="edit-address-information" element={<Address/>}/>
        <Route path="logout" element={<Logout/>}/>
      </Route>

      {/* Routes for admin */}
      <Route path="/admin" element={<PrivateAuthRoute isAdmin={true}/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="categories" element={<Categories/>}/>
        <Route path="inventory" element={<Inventory/>}/>
        <Route path="inventory/product/:id?" element={<ProductCreateEdit/>}/>
        <Route path="customers" element={<Customers/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="orders/:id" element={<SingleOrder/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="contacted-us" element={<ContactedUs/>}/>
        <Route path="logout" element={<Logout/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
