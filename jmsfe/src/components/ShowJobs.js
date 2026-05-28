import axios from "axios";
import React, { useEffect, useState } from "react";

function Job() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:5000/api/jobs")
            .then((res) => {

                console.log(res.data);

                setJobs(res.data.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (

        <div>

            <h1
                style={{

                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                Job Details
            </h1>

            <table
                border="1"
                cellPadding="10"
                style={{
                    margin: "auto",
                    borderCollapse: "collapse",
                    width: "95%"
                }}
            >

            <thead
    style={{
        backgroundColor: "black",
        color: "white"
    }}
>

    <tr>

        <th>Title</th>
        <th>Company</th>
        <th>Location</th>
        <th>Salary</th>
        <th>Job Type</th>
        <th>Experience</th>
        <th>Description</th>
        <th>Skills</th>

    </tr>

</thead>

                <tbody>

                    {
                        jobs.length > 0 ? (

                            jobs.map((job) => (

                                <tr key={job._id}>

                                    <td>{job.title}</td>

                                    <td>{job.companyName}</td>

                                    <td>{job.location}</td>

                                    <td>{job.salary}</td>

                                    <td>{job.jobType}</td>

                                    <td>{job.experience}</td>

                                    <td>{job.description}</td>

                                    <td>{job.skills.join(", ")}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="8">
                                    No Data Found
                                </td>

                            </tr>

                        )
                    }

                </tbody>

            </table>

        </div>

    );
}

export default Job;