import React, { useState, useEffect } from "react";
import { getAStudent, uploadStudentPicture } from "../services/StudentServices";
import { useParams } from "react-router-dom";
import { formatDate } from "../utilities/DateUtils";

const StudentCard = () => {
  const [student, setStudent] = useState(null);
  const { std_id } = useParams();

  useEffect(() => {
    getAStudent(std_id)
      .then((response) => setStudent(response.data))
      .catch((error) => console.error("Error fetching student:", error));
  }, [std_id]);

  if (!student) {
    return <h2 className="text-center mt-5">Loading Student Data...</h2>;
  }

  const profilePicUrl = student.profile_pic_url
    ? `http://localhost:8000${
        student.profile_pic_url.startsWith("/") ? "" : "/"
      }${student.profile_pic_url}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const resizedImage = await resizeImage(file);
      const response = await uploadStudentPicture(std_id, resizedImage);

      setStudent((prev) => ({
        ...prev,
        profile_pic_url: response.data.profile_pic_url,
      }));

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 500;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        }, file.type);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card shadow-lg p-4 rounded"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        {/* Profile Picture & Name Section */}
        <div className="text-center">
          <img
            className="rounded-circle border border-3 border-primary shadow-sm"
            src={profilePicUrl}
            alt="Profile"
            width={150}
            height={150}
            style={{ cursor: "pointer", transition: "transform 0.3s" }}
            onClick={handleImageClick}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
          <input
            type="file"
            id="file-input"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <h2 className="mt-3 fw-bold text-primary">
            {student.first_name} {student.last_name}
          </h2>
          <p className="text-muted fs-5">{student.email}</p>
          <span
            className={`badge ${
              student.is_active ? "bg-success" : "bg-danger"
            } fs-6 px-3 py-2`}
          >
            {student.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Student Details */}
        <div className="row text-center mt-4">
          {/* Left Column */}
          <div className="col-md-6 p-3 bg-light border rounded">
            <p>
              <strong>📞 Phone:</strong> {student.phone_number}
            </p>
            <p>
              <strong>🧑‍🎓 Gender:</strong> {student.gender}
            </p>
            <p>
              <strong>🎂 DOB:</strong> {formatDate(student.date_of_birth)}
            </p>
            <p>
              <strong>🌆 City:</strong> {student.city}
            </p>
            <p>
              <strong>🏛️ State:</strong> {student.state}
            </p>
          </div>

          {/* Right Column */}
          <div className="col-md-6 p-3 bg-light border rounded">
            <p>
              <strong>📌 Class:</strong> {student.standard} - {student.section}
            </p>
            <p>
              <strong>🔢 Roll No:</strong> {student.roll_number}
            </p>
            <p>
              <strong>📅 Enrollment:</strong>{" "}
              {formatDate(student.enrollment_date)}
            </p>
            <p>
              <strong>📊 GPA:</strong> {student.gpa}
            </p>
          </div>
        </div>

        {/* Created & Updated Info */}
        <div className="text-center mt-4">
          <small className="text-muted">
            🕒 Created: {formatDate(student.created_at)}
          </small>{" "}
          |
          <small className="text-muted">
            {" "}
            Updated: {formatDate(student.updated_at)}
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
