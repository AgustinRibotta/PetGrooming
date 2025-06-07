import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Owners from "./pages/Owners";
import OwnerDetail from "./pages/OwnerDetail";
import Pets from "./pages/Pets";
import AddNewClient  from "./pages/AddNewClient";  
import EditClient from "./pages/EditClient";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/owners" element={<Owners />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/owners/:id" element={<OwnerDetail />} />
            <Route path="/add-new" element={<AddNewClient  />} />
             <Route path="/edit-client/:id" element={<EditClient />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
