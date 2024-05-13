import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Home from "./Home"
import Shop from "./Shop"
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import SingleProductPage from './SingleProductPage'
import Cart from './Cart'
import UpdateProfile from './UpdateProfile'
import Checkout from './Checkout'
import ContactPage from './ContactPage'
import AdminHome from './Admin/AdminHome'
import AdminUser from './Admin/AdminUser'
import AdminMaincategory from './Admin/AdminMaincategory'
import AdminAddMaincategory from './Admin/AdminAddMaincategory'
import AdminUpdateMaincategory from './Admin/AdminUpdateMaincategory'
import AdminSubcategory from './Admin/AdminSubcategory'
import AdminAddSubcategory from './Admin/AdminAddSubcategory'
import AdminUpdateSubcategory from './Admin/AdminUpdateSubcategory'
import AdminBrand from './Admin/AdminBrand'
import AdminAddBrand from './Admin/AdminAddBrand'
import AdminUpdateBrand from './Admin/AdminUpdateBrand'
import AdminProduct from './Admin/AdminProduct'
import AdminAddProduct from './Admin/AdminAddProduct'
import AdminUpdateProduct from './Admin/AdminUpdateProduct'
import AdminNewsletter from './Admin/AdminNewsletter'
import AdminContactPage from './Admin/AdminContactPage'
import AdminSingleContact from './Admin/AdminSingleContact'
import AdminSingleCheckout from './Admin/AdminSingleCheckout'
import AdminCheckoutPage from './Admin/AdminCheckoutPage'
import Confirmation from './Confirmation'
import ForgetUserName from './ForgetUserName'
import ForgetOTP from './ForgetOTP'
import ForgetPassword from './ForgetPassword'
import Payment from './Payment'
export default function App() {
    useEffect(() => {
        if (localStorage.getItem("role") && localStorage.getItem("role") !== "Admin") {
            if (window.location.pathname.includes("Admin") === true || window.location.pathname.includes("admin") === true) {
                window.location.href='/'
            }
        }
    }, [])
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop/:mc/:sc/:br/:search" element={<Shop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/single-product-page/:_id" element={<SingleProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin-user" element={<AdminUser />} />
                    <Route path="/admin-maincategory" element={<AdminMaincategory />} />
                    <Route path="/admin-add-maincategory" element={<AdminAddMaincategory />} />
                    <Route path="/admin-update-maincategory/:_id" element={<AdminUpdateMaincategory />} />
                    <Route path="/admin-subcategory" element={<AdminSubcategory />} />
                    <Route path="/admin-add-subcategory" element={<AdminAddSubcategory />} />
                    <Route path="/admin-update-subcategory/:_id" element={<AdminUpdateSubcategory />} />
                    <Route path="/admin-brand" element={<AdminBrand />} />
                    <Route path="/admin-add-brand" element={<AdminAddBrand />} />
                    <Route path="/admin-update-brand/:_id" element={<AdminUpdateBrand />} />
                    <Route path="/admin-product" element={<AdminProduct />} />
                    <Route path="/admin-add-product" element={<AdminAddProduct />} />
                    <Route path="/admin-update-product/:_id" element={<AdminUpdateProduct />} />

                    <Route path="/admin-newsletter" element={<AdminNewsletter />} />

                    <Route path="/admin-contact" element={<AdminContactPage />} />

                    <Route path="/admin-single-contact/:_id" element={<AdminSingleContact />} />

                    <Route path="/admin-checkout" element={<AdminCheckoutPage />} />

                    <Route path="/admin-single-checkout/:_id" element={<AdminSingleCheckout />} />

                    <Route path="/confirm" element={<Confirmation />} />
                    <Route path="/forget-username" element={<ForgetUserName />} />
                    <Route path="/forget-otp" element={<ForgetOTP />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/payment/:_id" element={<Payment />} />


                </Routes>
                <Footer />
            </BrowserRouter>

        </>
    )
}
