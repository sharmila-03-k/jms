import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import "./Login.css";

function Login() {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: values.email,
                    password: values.password,
                }
            );
    console.log(response.data);
    if (response.data.success === true) {
        setMessage("Login successful. Redirecting to dashboard...");
        const token = response.data.data && response.data.data.token;
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('recruiter', JSON.stringify(response.data.data));
        }
        setTimeout(() => {
            navigate("/dashboard");
        }, 800);
    } else {
        setMessage("Invalid Email or Password");
    }
} catch (error) {
    console.log(error);
    setMessage("Something went wrong");
}
    };
return (
    <div className="login-container">
        <div className="login-box">
            <div className="login-header">
                <h2> Recruiter Login Page</h2>
                <div className="header-actions">
                    <Link to="/seeker/register" className="link-btn">Seeker Register</Link>
                </div>
            </div>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
            {message && (
                <div className={`message ${message.toLowerCase().includes("success") ? "success" : "error"}`}>
                    {message}
                </div>
            )}
            <div className="register-link" style={{marginTop: '16px'}}>
                <div>
                    <p>Not registered yet?</p>
                    <Link to="/register">Register as Recruiter</Link>
                </div>
            </div>
        </div>
    </div>
);
}
export default Login;