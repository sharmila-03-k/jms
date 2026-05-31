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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5"
        }}
    >
        <div
            style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "400px"
            }}
        >
            <h2 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
                Login Page
            </h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "500" }}>
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                            transition: "border-color 0.3s"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#0056b3"}
                        onBlur={(e) => e.target.style.borderColor = "#ddd"}
                    />
                </div>
                <div style={{ marginBottom: "25px" }}>
                    <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "500" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                            transition: "border-color 0.3s"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#0056b3"}
                        onBlur={(e) => e.target.style.borderColor = "#ddd"}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#0056b3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.3s, transform 0.2s"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#004494";
                        e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#0056b3";
                        e.target.style.transform = "translateY(0)";
                    }}
                >
                    Login
                </button>
            </form>
            {message && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "12px",
                        backgroundColor: message.includes("successful") ? "#d4edda" : "#f8d7da",
                        color: message.includes("successful") ? "#155724" : "#721c24",
                        borderRadius: "4px",
                        textAlign: "center",
                        fontSize: "14px",
                        border: `1px solid ${message.includes("successful") ? "#c3e6cb" : "#f5c6cb"}`
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    </div>
);
}
export default Login;