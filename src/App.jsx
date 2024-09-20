import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import EmployeeCRUD from "./EmployeeCRUD";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<EmployeeCRUD />} />
        <Route path="/edit/:employeeId" element={<EmployeeCRUD />} />
      </Routes>
    </Router>
  );
}

export default App;