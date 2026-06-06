import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowJobs.css";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const seeker = localStorage.getItem('seeker');
    if (!seeker) {
      navigate('/seeker/login');
      return;
    }
    const seekerData = JSON.parse(seeker);
    fetchMyApplications(seekerData._id);
  }, [navigate]);

  const fetchMyApplications = async (seekerId) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get(`http://localhost:5000/api/seeker/applications/my-applications?seekerId=${seekerId}`);
      setApplications(res.data.data || []);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('seeker');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>My Applications</h1>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
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
            <th>Skills</th>
            <th>Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => {
              const job = app.job || {};
              return (
                <tr key={app._id}>
                  <td>{job.title}</td>
                  <td>{job.companyName}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}</td>
                  <td>{new Date(app.createdAt).toLocaleString()}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>{loading ? '' : 'No Applications Found'}</td>
            </tr>
          )}
        </tbody>
      </table>

      {message && (
        <div className={`message error`} style={{ marginTop: '20px' }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default AppliedJobs;
