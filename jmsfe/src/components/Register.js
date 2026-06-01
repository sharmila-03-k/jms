import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                phone,
                company,
            });
            console.log(response.data);
            if (response.data.success) {
                setMessage("Registered successfully. Redirecting...");
                if (response.data.data?.token) {
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('recruiter', JSON.stringify(response.data.data));
                }
                setTimeout(() => navigate('/dashboard'), 800);
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
            <h2>Register Recruiter</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    type="tel" 
                    placeholder="Phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Company" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && (
                <div className={`message-box ${message.includes("successfully") ? "success" : "error"}`}>
                    {message}
                </div>
            )}
            <div className="back-to-login">
                <p>Already have an account? <Link to="/">Back to Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
