import axios from "axios";
import { BrowserRouter } from "react-router-dom";

function App() {
  console.log(axios);

  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>JMS Frontend</h1>
        </header>
          <p>Dummy React Project</p>
      </div>
    </BrowserRouter>
  );
}

export default App;