import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            navigate("/jobs");
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
    <div
        style={{
            border: "2px solid black",
            padding: "20px",
            width: "300px",
            margin: "auto",
            marginTop: "100px"
        }}
    >
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            <button type="submit">
                Login
            </button>
        </form>
        <br />
        <div>
            {message}
        </div>
    </div>
);
}
export default Login;