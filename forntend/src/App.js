import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import {
  Home,
  Nbr,
  Login,
  Footer,
  Profile,
  AdminDashboard,
  Register,
} from "./Components/Index";

function App() {
  return (
    <Router>
      <div className="App">
        <Nbr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Sign" element={<Register />} />{" "}
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile/:key/:id" element={<Profile />} />{" "}
          <Route path="/Profile/:adminId/:key/:id" element={<Profile />} />{" "}
          <Route path="/Dashboard/:id" element={<AdminDashboard />} />{" "}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
