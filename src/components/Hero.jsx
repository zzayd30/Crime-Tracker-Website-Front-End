import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <div className="crime hero min-h-screen">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome To Crime Tracker</h1>
                    <p className="mb-5">Welcome to Crime Tracker, your centralized hub for tracking and analyzing crime data. Whether you're a concerned citizen or a dedicated law enforcement officer, our platform empowers you to contribute to safer communities by reporting and investigating crime incidents efficiently.</p>
                    <Link to="/signup" className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero
