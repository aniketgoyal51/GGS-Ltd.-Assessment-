import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");

    const navigator = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userEmail && !userPassword) {
            setError("Email and Password are required!");
            return;
        } else if (!userEmail) {
            setError("Email is required!");
            return
        } else if (!userPassword) {
            setError("Password is required!");
            return
        } else {
            axios.post(`${import.meta.env.VITE_BASE_URL}api/login`, { email: userEmail, password: userPassword })
                .then((res) => {
                    localStorage.setItem("Token", res.data.token)
                    // console.log(res.data.token)
                    navigator("/Users")
                }).catch((err) => {
                    console.log(err)
                })
        }
        setError("");

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Enter your email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Enter your password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                    >
                        Login
                    </button>
                </form>
                {/* <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <Link to={"/Signup"} className="text-purple-600 font-medium hover:underline">Sign Up</Link>
                </p> */}
            </div>
        </div>
    );
}

export default Login;
