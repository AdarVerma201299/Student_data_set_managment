// src/Components/Utilies.jsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const GlobalContext = createContext();

const fetchData = (id, setIp, setAdminData, setShiftFeeData, setError) => {
  // fetch("https://localhost:3000")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setIp(data.ip);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching public IP:", error);
  //     setError(error);
  //   });

  const fetchAdminAndShiftData = async () => {
    try {
      const adminRes = await fetch(
        `http://localhost:5000/api/Admin_data/${id}`
      );
      const adminData = await adminRes.json();
      const adminExists = adminData.adminData.length > 0;
      setAdminData(adminExists);
      const shiftRes = await fetch(
        `http://localhost:5000/api/getShiftFeeData/${id}`
      );
      const shiftData = await shiftRes.json();
      setShiftFeeData(shiftData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    }
  };

  if (id) {
    fetchAdminAndShiftData();
  }
};

export function GlobalProvider({ children }) {
  const { id } = useParams();
  const [ip, setIp] = useState(null);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [shiftFeeData, setShiftFeeData] = useState([]);

  useEffect(() => {
    fetchData(id, setIp, setAdminData, setShiftFeeData, setError);
  }, [id]);

  const anotherFunction = (param) => `Hello, ${param}`;

  return (
    <GlobalContext.Provider
      value={{ ip, error, adminData, shiftFeeData, anotherFunction }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalFunctions() {
  return useContext(GlobalContext);
}
