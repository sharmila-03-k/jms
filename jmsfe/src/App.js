import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowJobs from "./components/ShowJobs";
import Login from "./components/Login";
import Register from "./components/Register";
import SeekerRegister from "./components/SeekerRegister";
import SeekerLogin from "./components/SeekerLogin";
import SeekerJobs from "./components/SeekerJobs";
import AppliedJobs from "./components/AppliedJobs";
import JobForm from "./components/JobForm";
import "./App.css";

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ShowJobs />} />
        
        {/* Seeker routes */}
        <Route path="/seeker/register" element={<SeekerRegister />} />
        <Route path="/seeker/login" element={<SeekerLogin />} />
        <Route path="/seeker/jobs" element={<SeekerJobs />} />
        <Route path="/seeker/applied" element={<AppliedJobs />} />
        <Route path="/jobs" element={<ShowJobs />} />
        <Route path="/job/create" element={<JobForm />} />
        <Route path="/job/edit/:id" element={<JobForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;