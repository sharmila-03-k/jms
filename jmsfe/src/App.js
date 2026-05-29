import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowJobs from "./components/ShowJobs";
import Login from "./components/Login";
import Register from "./components/Register";
import JobForm from "./components/JobForm";

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ShowJobs />} />
        <Route path="/jobs" element={<ShowJobs />} />
        <Route path="/job/new" element={<JobForm />} />
        <Route path="/job/:id" element={<JobForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;