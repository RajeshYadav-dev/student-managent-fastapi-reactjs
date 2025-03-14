import React, { useState } from "react";
import { addStudent } from "../services/StudentServices";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    standard: "",
    is_active: false,
  });

  const navigator = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveStudent = (event) => {
    event.preventDefault();
    const form = event.target.form;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addStudent(student);
      console.log(student);
      setStudent({
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        standard: "",
        is_active: false,
      });
      navigator("/");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 my-5">
          <h2 className="text-center">Add Student</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Student First Name</label>
                <input
                  type="text"
                  placeholder="Enter Student First Name"
                  name="first_name"
                  value={student.first_name}
                  className="form-control"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Student Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Student Last Name"
                  name="last_name"
                  value={student.last_name}
                  className="form-control"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Student Email</label>
                <input
                  type="email"
                  placeholder="Enter Student Email"
                  name="email"
                  value={student.email}
                  className="form-control"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Student City</label>
                <input
                  type="text"
                  placeholder="Enter Student City"
                  name="city"
                  value={student.city}
                  className="form-control"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Student Class</label>
                <input
                  type="text"
                  placeholder="Enter Student Class"
                  name="standard"
                  value={student.standard}
                  className="form-control"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label me-2">Accept</label>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={student.is_active}
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-success" onClick={saveStudent}>
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
