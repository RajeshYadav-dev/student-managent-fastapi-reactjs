import React, { useState, useEffect } from "react";
import { updateStudent, getAStudent } from "../services/StudentServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditStudent = () => {
  const navigator = useNavigate();
  const { std_id } = useParams();
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    standard: "",
    is_active: false,
  });

  useEffect(() => {
    getAStudent(std_id)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }, [std_id]);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const editStudent = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(std_id, student);
      navigator("/");
      alert("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">Edit Student</h2>
          <form onSubmit={editStudent}>
            <div className="form-group mb-2">
              <label className="form-label">First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                value={student.first_name}
                className="form-control"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                value={student.last_name}
                className="form-control"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={student.email}
                className="form-control"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">City</label>
              <input
                type="text"
                placeholder="Enter City"
                name="city"
                value={student.city}
                className="form-control"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Class</label>
              <input
                type="text"
                placeholder="Enter Class"
                name="standard"
                value={student.standard}
                className="form-control"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label me-2">Active</label>
              <input
                type="checkbox"
                name="is_active"
                checked={student.is_active}
                onChange={handleOnChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
