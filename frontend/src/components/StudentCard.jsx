import React, { useState, useEffect } from "react";
import { getAStudent, uploadStudentPicture } from "../services/StudentServices";
import { useParams } from "react-router-dom";

const StudentCard = () => {
  const [student, setStudent] = useState({});
  const { std_id } = useParams();

  const profilePicUrl = student.profile_pic_url
    ? `http://localhost:8000${
        student.profile_pic_url.startsWith("/") ? "" : "/"
      }${student.profile_pic_url}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    getAStudent(std_id)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }, [std_id]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Resize image
    const resizedImage = await resizeImage(file);

    // Upload image
    uploadStudentPicture(std_id, resizedImage)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        setStudent((prev) => ({
          ...prev,
          profile_pic_url: response.data.profile_pic_url,
        }));
        console.log(student);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const maxWidth = 500;
      const maxHeight = 500;
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        }, file.type);
      };
    });
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="container col-md-4 mt-5">
      <div className="card text-center">
        <div className="card-body my-5 mx-5">
          <img
            className="rounded-circle mb-3"
            src={profilePicUrl}
            alt="Profile"
            onClick={handleImageClick}
            width={200}
            height={200}
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            id="file-input"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <h5 className="card-title mb-3">
            {student.first_name + " " + student.last_name}
          </h5>
          <p className="card-text mb-3 ">{student.email}</p>
          <p className="card-text mb-3">{student.city}</p>
          <p className="card-text mb-3">{student.standard}</p>
          <p className="card-text mb-3">
            IS ACTIVE:{student.is_active ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
