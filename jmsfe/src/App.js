import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowJobs from "./components/ShowJobs";
import Login from "./components/Login";

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jobs" element={<ShowJobs />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;