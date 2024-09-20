import axios from "axios";
import serverUrl from "./baseURL";

const api = axios.create({
  baseURL: serverUrl,
});

// Fetch all employees
export const fetchEmployees = () => api.get("/employees");

// Fetch a single employee by ID
export const fetchEmployeeById = (id) => api.get(`/employees/${id}`);

// Add a new employee
export const addEmployee = (employee) => api.post("/employees", employee);

// Update an existing employee
export const updateEmployee = (id, employee) => api.put(`/employees/${id}`, employee);

// Delete an employee
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);