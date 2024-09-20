import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import serverUrl from "./services/baseURL";
import './App.css';

const EmployeeCRUD = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(`${serverUrl}/employees/${id}`);
      const employee = response.data;
      setId(employee.id);
      setName(employee.name);
      setEmail(employee.email);
      setStatus(employee.status);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if ((!id.trim()) && id.disabled) newErrors.id = "Id is required.";
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!status) newErrors.status = "Status selection is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (employeeId) {
          await axios.put(`${serverUrl}/employees/${employeeId}`, {
            id,
            name,
            email,
            status,
          });
        } else {
          await axios.post(`${serverUrl}/employees`, {
            id,
            name,
            email,
            status,
          });
        }
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setEmail("");
    setStatus("");
    setErrors({});
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh", // Full viewport height for proper vertical centering
        backgroundColor: "#f0f2f5" // Light background color to highlight the form
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          backgroundColor: "#cbdee4", // Custom light gray background color for the card
          //borderColor: "#154c79", 
          width: "550px", // Fixed width to keep the form neatly aligned
          padding: "30px",
          borderRadius: "15px"
        }}
      >
        <div
          className="card-header text-center"
          style={{ backgroundColor: "#ad7a5b", color: "#fff", borderRadius: "10px" }}
        >
          <h2>{employeeId ? "Edit Employee" : "Add Employee"}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">Id</label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={id}
                placeholder="Enter ID"
                onChange={(e) => setId(e.target.value)}
                disabled={!!employeeId}
                style={{ borderRadius: "10px" }}
              />
              {errors.id && <div className="text-danger">{errors.id}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ borderRadius: "10px", }}
              >
                <option value="" disabled>Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && <div className="text-danger">{errors.status}</div>}
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn" 
                style={{
                  backgroundColor: "#289cc3", // Custom green background color for Add/Update button
                  color: "#fff", // White text color
                  width: "200px",
                  borderRadius: "10px"
                }}
              >
                {employeeId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "#dc3545", // Custom red background color for Cancel button
                  color: "#fff", // White text color
                  width: "200px",
                  borderRadius: "10px"
                }}
                onClick={clearForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCRUD;
