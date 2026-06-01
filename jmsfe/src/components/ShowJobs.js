import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShowJobs.css";

function ShowJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recruiterName, setRecruiterName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const recruiterData = localStorage.getItem('recruiter');
        
        if (!token) {
            navigate('/');
            return;
        }
        
        if (recruiterData) {
            try {
                const recruiter = JSON.parse(recruiterData);
                setRecruiterName(recruiter.name || '');
            } catch (err) {
                console.log('Error parsing recruiter data:', err);
            }
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
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>Job Details</h1>
                    {recruiterName && (
                        <div className="welcome-message">
                            Welcome, {recruiterName}!
                        </div>
                    )}
                </div>
                <div className="header-actions">
                    <Link to="/job/create">
                        <button className="btn-create">Create Job</button>
                    </Link>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {loading && <p className="loading-message">Loading...</p>}

            <table className="jobs-table" border="1">
                <thead>
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
                                    <div className="table-actions">
                                        <Link to={`/job/edit/${job._id}`}>
                                            <button className="btn-table btn-edit">Edit</button>
                                        </Link>
                                        <button 
                                            className="btn-table btn-delete" 
                                            onClick={() => handleDelete(job._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
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