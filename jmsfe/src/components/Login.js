import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: email,
                    password: password
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
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
            {message && (
                <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
                    {message}
                </div>
            )}
            <div className="register-link">
                <p>Not registered yet?</p>
                <Link to="/register">Register as Recruiter</Link>
            </div>
        </div>
    </div>
);
}
export default Login;