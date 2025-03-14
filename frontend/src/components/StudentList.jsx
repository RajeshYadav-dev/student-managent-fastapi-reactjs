import React, { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../services/StudentServices";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../utilities/DateUtils";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    getAllStudents()
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(true);
      });
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  const handleEditStudent = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.std_id !== id));
        showNotification("Student deleted successfully!", "success");
      } catch (error) {
        showNotification("Failed to delete student.", "error");
        console.error("Error deleting student:", error);
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification("");
    }, 3000); // Hide after 3 seconds
  };

  if (loading) <h1>Please Wait Loading...</h1>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center my-4">Student Management System</h1>

      {notification && (
        <div
          className={`alert ${
            notification.type === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {notification.message}
        </div>
      )}

      <button className="btn btn-primary mb-3" onClick={handleAddStudent}>
        Add Student
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Class</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.std_id}>
              <td>{index + 1}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.city}</td>
              <td>{student.standard}</td>
              <td>{formatDate(student.created_at)}</td>
              <td>{formatDate(student.updated_at)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditStudent(student.std_id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteStudent(student.std_id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/profile/${student.std_id}`)}
                >
                  Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
