import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useUserStore } from '../store/store'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader'
import { useLocation } from 'react-router-dom'
const Layout = () => {
    console.log(useLocation().pathname)

    const {
        isAlert,
        alertMsg,
        alertType,
        setIsAlert,
        isLogin,
        setIsLogin,
        setUsername,
        setToken,
        setUserId,
        setIsLoading,
        isLoading,
        setRole
    } = useUserStore();
    const checkAuth = async () => {
        const token = localStorage.getItem('crime-tracker-token');
        const user = JSON.parse(localStorage.getItem('crime-tracker-user'));
        if (token) {
            setUsername(user.Username);
            setUserId(user.UserId);
            setRole(user.Role);
            setToken(token);
            setIsLogin(true);
            setIsLoading(false);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        checkAuth();
        console.log
        console.log("THis is isAlert", alertType)
        if (isAlert) {
            if (alertType == "success") {
                toast.success(alertMsg, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (alertType == "error") {
                toast.error(alertMsg, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            setIsAlert(false);
        }
    }, [isAlert]);
    return (
        <div className='app'>
            {isLogin && useLocation().pathname !== '/admin' && <Navbar />}
            <ToastContainer
                style={{
                    zIndex: 100
                }}
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {!isLoading ? <Outlet /> : <Loader />}
            {isLogin && <Footer />}
        </div>
    )
}

export default Layout
