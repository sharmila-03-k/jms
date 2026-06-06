import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import "./Login.css";

function SeekerLogin() {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/seeker/auth/login", { email: values.email, password: values.password });
            console.log(response.data);
            if (response.data.success === true) {
                setMessage("Login successful. Redirecting to jobs...");
                if (response.data.data) {
                    localStorage.setItem('seeker', JSON.stringify(response.data.data));
                }
                setTimeout(() => navigate('/seeker/jobs'), 700);
            } else {
                setMessage(response.data.message || "Invalid Email or Password");
            }
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Seeker Login</h2>
                <form onSubmit={handleLogin}>
                            <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Enter Email" value={values.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter Password" value={values.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {message && (
                    <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
                        {message}
                    </div>
                )}
                <div className="register-link">
                    <p>Don't have an account?</p>
                    <Link to="/seeker/register">Register as Seeker</Link>
                </div>
            </div>
        </div>
    );
}

export default SeekerLogin;
