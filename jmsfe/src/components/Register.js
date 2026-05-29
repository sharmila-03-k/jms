import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            if (response.data.success === true) {
                setMessage("Registered successfully. Redirecting...");
                const token = response.data.data && response.data.data.token;
                if (token) {
                    localStorage.setItem('token', token);
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
        <div style={{ border: '2px solid black', padding: '20px', width: '400px', margin: 'auto', marginTop: '50px' }}>
            <h2>Register Recruiter</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <br /><br />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <br /><br />
                <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                <br /><br />
                <button type="submit">Register</button>
            </form>
            <div style={{ marginTop: '10px' }}>{message}</div>
        </div>
    );
}

export default Register;
