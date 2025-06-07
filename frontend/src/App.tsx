import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Owners from "./pages/Owners";
// import Pets from "./pages/Pets";
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/owners" element={<Owners />} />
            {/* <Route path="/pets" element={<Pets />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
