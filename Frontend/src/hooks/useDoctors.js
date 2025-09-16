 import { useState, useEffect } from "react";

const useDoctors = (department = "") => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "https://ashaali-hospital-2.onrender.com";

  // Fetch departments
  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors/departments/list`)
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((err) => {
        console.error("Departments fetch error:", err);
      });
  }, [BASE_URL]);

  // Fetch doctors
  useEffect(() => {
    setLoading(true);
    let url = `${BASE_URL}/api/doctors`;
    if (department) url += `?department=${department}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Doctors fetch error:", err);
        setLoading(false);
      });
  }, [department, BASE_URL]);

  return { doctors, departments, loading };
};

export default useDoctors;
