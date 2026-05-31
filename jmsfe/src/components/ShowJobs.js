import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ShowJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        setLoading(true);
        axios
            .get("http://localhost:5000/api/jobs", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
            .then((res) => {
                console.log(res.data);
                setJobs(res.data.data || []);
            })
            .catch((err) => {
                console.log(err);
                setJobs([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    const tableButtonStyle = {
        padding: '6px 12px',
        border: '1px solid #999',
        background: '#fff',
        color: '#333',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        minWidth: '70px'
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/jobs/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            setJobs((prev) => prev.filter((j) => j._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete job');
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('recruiter');
        navigate('/');
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Job Details</h1>
                <div>
                    <Link to="/job/new"><button style={{ marginRight: '8px' }}>Create Job</button></Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

            <table style={{ borderCollapse: "collapse", width: "100%" }} border="1">
                <thead style={{ backgroundColor: "black", color: "white" }}>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Job Type</th>
                        <th>Experience</th>
                        <th>Description</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.title}</td>
                                <td>{job.companyName}</td>
                                <td>{job.location}</td>
                                <td>{job.salary}</td>
                                <td>{job.jobType}</td>
                                <td>{job.experience}</td>
                                <td>{job.description}</td>
                                <td>{Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', alignItems: 'center' }}>
                                        <Link to={`/job/${job._id}`}><button style={tableButtonStyle}>Edit</button></Link>
                                        <button style={tableButtonStyle} onClick={() => handleDelete(job._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>
                                {loading ? "" : "No Data Found"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowJobs;