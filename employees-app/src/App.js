import React, { useState, useEffect } from 'react';
import './App.css'; 
import employeeData from './employees.json'; 

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    
    setEmployees(employeeData.employees);
  }, []); 

  const Employee = ({ employee }) => {
    return (
      <div className="Employee">
        <p className="Name">{employee.first_name} {employee.last_name}</p>
        <p>Email: {employee.email}</p>
        <p>Phone: {employee.phone}</p>
        <p>Title: {employee.title}</p>
        <p>Department: {employee.department}</p>
        <img src={employee.image} alt={`${employee.first_name} ${employee.last_name}`} />
      </div>
    );
  };

  return (
    <div className="App">
      {employees.map((employee, index) => (
        <Employee key={index} employee={employee} />
      ))}
    </div>
  );
}

export default App;