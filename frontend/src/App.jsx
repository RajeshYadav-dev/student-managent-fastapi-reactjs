import "./App.css";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import StudentCard from "./components/StudentCard";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:std_id" element={<EditStudent />} />
          <Route path="/profile/:std_id" element={<StudentCard />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
