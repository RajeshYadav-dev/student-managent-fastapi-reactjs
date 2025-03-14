import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1/students/";

export const getAllStudents = () => axios.get(`${BASE_URL}`);
export const addStudent = (student) => axios.post(`${BASE_URL}`, student);
export const getAStudent = (std_id) => axios.get(`${BASE_URL}${std_id}/`);
export const updateStudent = (std_id, student) =>
  axios.put(`${BASE_URL}${std_id}/`, student);
export const deleteStudent = (std_id) => axios.delete(`${BASE_URL}${std_id}/`);

export const uploadStudentPicture = (std_id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${BASE_URL}${std_id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
