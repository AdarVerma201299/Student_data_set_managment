const ServerUrl = "https://student-data-set-managment.onrender.com/api";

const LoginUrl = {
  Student: `${ServerUrl}/login`,
  Admin: `${ServerUrl}/Adminlogin`,
};

const RegitrationUrl = {
  Admin: `${ServerUrl}/Adminregister`,
  Student: `${ServerUrl}/register`,
};

const handleRegistationSubmit = async (e, formData, Type) => {
  e.preventDefault();

  if (formData.Security.password !== formData.Security.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const form = new FormData();
    form.append("name", formData.personal.name);
    form.append("fatherName", formData.personal.fatherName);
    form.append("DOB", formData.personal.DOB);
    form.append("email", formData.personal.email);
    form.append("Gender", formData.personal.Gender);
    form.append("mobile", formData.personal.mobile);
    form.append("School", formData.personal.School);
    form.append("aadhaar", formData.Document.aadhaar);
    if (Type === "Admin") {
      form.append(
        "selectedOptions",
        JSON.stringify(formData.personal.selectedOptions)
      );
      form.append("userId", formData.Security.userId);
    }

    if (formData.Document.image) {
      form.append("image", formData.Document.image);
    }

    if (formData.Document.FrontAadharCardImage) {
      form.append(
        "FrontAadharCardImage",
        formData.Document.FrontAadharCardImage
      );
    }

    if (formData.Document.BackAadharCardImage) {
      form.append("BackAadharCardImage", formData.Document.BackAadharCardImage);
    }

    form.append("residential", JSON.stringify(formData.residential));
    form.append("permanent", JSON.stringify(formData.permanent));
    form.append("password", formData.Security.password);

    const response = await fetch(RegitrationUrl[Type], {
      method: "POST",
      body: form,
    });
    const json = await response.json();
    if (response.ok) {
      if (json.success) {
        return true;
      } else {
        const errorMessages = json.errors
          ? json.errors.map((err) => err.msg).join(", ")
          : json.error || "An unknown error occurred";
        alert(errorMessages);
      }
    } else {
      alert("An error occurred: " + json.error);
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error occurred while processing your request");
  }
};

const handleloginSubmit = async (e, formData, user) => {
  e.preventDefault();
  try {
    const form = {
      name: user === "Admin" ? formData.userId : formData.name,
      password: formData.password,
      email: formData.email,
    };
    console.log(form);
    const response = await fetch(LoginUrl[user], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      if (user === "Student" && res.shiftFeeData) {
        localStorage.setItem(
          `FeeShiftData${user}`,
          JSON.stringify(res.shiftFeeData)
        );
      }
      localStorage.setItem("authtocken", res.auth);
      localStorage.setItem("logged", res.success);
      const msg = res.success;
      const UserData = res.UserData;
      localStorage.setItem("loginId", res.id);
      const AdminData = res.AdminData;
      return { UserData, AdminData, msg };
    } else {
      const error = await response.json();
      alert("An error occurred: " + error.error);
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error occurred while processing your request");
  }
};

const handleShiftFee = async (formData, id, adminId) => {
  try {
    const form = { shift: formData.shifts, Fee: formData.MonthlyFee };
    const authtoken = localStorage.getItem("authtocken");
    const response = await fetch(`${ServerUrl}/AddShiftFee/${adminId}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authtoken}`,
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("API Response data: ", data); // Debug log
      const shiftdata = data.data;
      return { shiftdata };
    } else {
      console.error("Failed API response: ", response.status);
      alert("An error occurred while updating the shift fee.");
    }
  } catch (error) {
    console.error("Error during API call:", error.message);
    alert("Error occurred while processing your request");
  }
};

const handleFeePayment = async (e, id, formData) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("authtocken");
    const response = await fetch(`${ServerUrl}/FeePayment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Shift and Fee Structure Added Sussesfully");
      return true;
    } else {
      alert("An error occurred: ");
    }
  } catch (error) {
    console.log("aalll asjdna");
    console.error("Error:", error.message);
    alert("Error occurred while processing your request");
  }
};

const verifyStudentUserBYAdmin = async (id) => {
  try {
    const authToken = localStorage.getItem("authtocken");
    const res = await fetch(`${ServerUrl}/VerifyUser/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.msg || "Verification successful");
      return data.success;
    } else {
      const errorData = await res.json();
      alert(errorData.error || "An error occurred while verifying the user.");
      return false;
    }
  } catch (error) {
    alert("An unexpected error occurred: " + error.message);
    console.error("Frontend error:", error);
  }
};

const Datehandle = (GivenDate) => {
  const dateObj = new Date(GivenDate);
  const date = dateObj.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    { month: "short" }
  );
  return date;
};

const calculateMonthDifference = (start, end) => {
  if (start !== "" && end !== "") {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let monthDiff =
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear());
    return monthDiff;
  }
};

// const fetchUserData = async (e, id) => {
//   e.preventDefault();
//   let UserData = {};
//   const authToken = localStorage.getItem("authtocken");

//   try {
//     const userResponse = await fetch(
//       `${ServerUrl}/profile/${id}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     const userJson = await userResponse.json();

//     if (userResponse.ok && userJson.success) {
//       UserData = userJson.user;
//     } else {
//       alert(
//         userJson.error || "An unknown error occurred while fetching user data."
//       );
//     }
//   } catch (error) {
//     alert("An unexpected error occurred: " + error.message);
//   }

//   return { UserData };
// };

const FetchFeePyamentData = async (id) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const shiftResponse = await fetch(`${ServerUrl}/getShiftFeeData/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const shiftData = await shiftResponse.json();
    if (shiftResponse.ok) {
      console.log(shiftData.data);
      localStorage.setItem(`FeeShiftData${id}`, JSON.stringify(shiftData.data));
      return true;
    } else {
      alert(
        shiftData.error ||
          "An unknown error occurred while fetching shift payment data."
      );
    }
  } catch (error) {
    alert("An unexpected error occurred: " + error.message);
  }
};

const FeeAndPaymentRecord = (id, PaymentRecord) => {
  const storedData = localStorage.getItem(`PaymentRecords${id}`);
  const PaymentRecords = storedData ? JSON.parse(storedData) : [];
  const existingItem = PaymentRecords.find((item) => item.id === id);
  if (existingItem) {
    existingItem.PaymentRecords.push(PaymentRecord);
  } else {
    PaymentRecords.push({ id: id, PaymentRecords: [PaymentRecord] });
  }
  localStorage.setItem(`PaymentRecords${id}`, JSON.stringify(PaymentRecords));
};

const RemoveUser = async (adminId, id) => {
  try {
    const authToken = localStorage.getItem("authtocken");
    const res = await fetch(`${ServerUrl}/Delete/${adminId}/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.ok) {
      alert("Remover User Successfully");
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error occurred while processing your request");
  }
};

const updateUserData = (key, attributeName, attributeValue) => {
  const UserData = JSON.parse(localStorage.getItem("UserData")); // Get the data from localStorage

  if (UserData && UserData.length > key) {
    const updatedUserData = [...UserData];
    updatedUserData[key] = {
      ...updatedUserData[key],
      [attributeName]: attributeValue,
    };
    localStorage.setItem("UserData", JSON.stringify(updatedUserData));
  } else {
    console.log("Key is out of bounds or UserData is not available.");
  }
};

const ImageUrlSet = (imagePath) => {
  if (imagePath) {
    const formattedImagePath = imagePath.replace(/\\/g, "/");
    return `https://student-data-set-managment.onrender.com/${
      formattedImagePath.startsWith("/") ? "" : "/"
    }${formattedImagePath}`;
  }
  return null;
};

// const fetchAddressByPinCode = async (pinCode) => {
//   const response = await fetch(
//     `https://api.postalpincode.in/pincode/${pinCode}`
//   );
//   const res = await response.json();

//   if (res[0]?.Status === "Success") {
//     // Ensure response is an array and status is "Success"
//     return res[0].PostOffice; // Return the PostOffice array
//   } else {
//     throw new Error("Invalid PIN Code or no data found");
//   }
// };

const DeleteUserInLocalStorage = (key) => {
  let UserData = JSON.parse(localStorage.getItem("UserData"));
  console.log(UserData[key]);
  if (UserData && UserData.length > key) {
    UserData.splice(key);
  }

  localStorage.setItem("UserData", JSON.stringify(UserData));
};
export {
  handleRegistationSubmit,
  handleloginSubmit,
  handleShiftFee,
  verifyStudentUserBYAdmin,
  handleFeePayment,
  Datehandle,
  calculateMonthDifference,
  FeeAndPaymentRecord,
  FetchFeePyamentData, //datasheet ,
  RemoveUser,
  updateUserData,
  ImageUrlSet,
  DeleteUserInLocalStorage,
};
