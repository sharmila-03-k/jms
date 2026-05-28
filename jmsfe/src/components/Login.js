import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: username,
                    password: password
                }
            );
    console.log(response.data);
    if (response.data.success === true) {
        navigate("/jobs");
    } else {
        setMessage("Invalid Username or Password");
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
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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