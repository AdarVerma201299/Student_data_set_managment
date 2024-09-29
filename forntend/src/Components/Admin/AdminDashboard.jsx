import React, { useEffect, useState } from "react";

import { AdminProfile, DataSheet } from "../Index";

function AdminDashboard() {
  const [userData, setuserData] = useState({});
  const [adminData, setadminData] = useState({});
  const adminId = localStorage.getItem("loginId");
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      setadminData(JSON.parse(adminData));
    }
    const UserData = localStorage.getItem("UserData");
    if (UserData) {
      setuserData(JSON.parse(UserData));
    }
  }, []);

  const datasheet =
    userData?.length > 0 ? (
      userData.map((data, key) => (
        <DataSheet key={key} data={data} adminId={adminId} index={key} />
      ))
    ) : (
      <p>No user data available</p>
    );
  return (
    <div>
      <AdminProfile data={adminData} />

      <div className="m-4">{datasheet}</div>
    </div>
  );
}

export default AdminDashboard;
