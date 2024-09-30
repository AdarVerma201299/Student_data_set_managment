import React, { useEffect, useState } from "react";
import { AdminProfile, DataSheet } from "../Index";
import { Container, Row } from "react-bootstrap";

function AdminDashboard() {
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState({});
  const adminId = localStorage.getItem("loginId");

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      setAdminData(JSON.parse(adminData));
    }
    const UserData = localStorage.getItem("UserData");
    if (UserData) {
      setUserData(JSON.parse(UserData));
    }
  }, []);

  const datasheet =
    userData.length > 0 ? (
      userData.map((data, key) => (
        <DataSheet key={key} data={data} adminId={adminId} index={key} />
      ))
    ) : (
      <p>No user data available</p>
    );

  return (
    <Container
      fluid
      className="p-4"
      style={{
        background:
          "linear-gradient(140deg, rgba(1, 6, 39, 1) 0%, rgba(2, 7, 117, 1) 50%, rgba(238, 130, 238, 1) 100%)",
      }}
    >
      <AdminProfile data={adminData} />
      <Row className="mt-4">{datasheet}</Row>
    </Container>
  );
}

export default AdminDashboard;
