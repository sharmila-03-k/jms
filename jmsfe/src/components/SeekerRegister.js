import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import "./Register.css";

function SeekerRegister() {
    const { values, handleChange } = useForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        skills: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
                phone: values.phone,
                skills: values.skills.split(',').map(s => s.trim()).filter(Boolean),
            };
            const response = await axios.post("http://localhost:5000/api/seeker/auth/register", payload);
            console.log(response.data);
            if (response.data.success) {
                setMessage("Registered successfully. Redirecting to login...");
                setTimeout(() => navigate('/seeker/login'), 700);
            } else {
                setMessage(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('Something went wrong');
        }
    };

    return (
        <div className="register-container">
            <h2>Register Job Seeker</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone" value={values.phone} onChange={handleChange} />
                <input type="text" name="skills" placeholder="Skills (comma separated)" value={values.skills} onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            {message && (
                <div className={`message-box ${message.includes("successfully") ? "success" : "error"}`}>
                    {message}
                </div>
            )}
            <div className="back-to-login">
                <p>Already have an account? <Link to="/seeker/login">Seeker Login</Link></p>
            </div>
        </div>
    );
}

export default SeekerRegister;
