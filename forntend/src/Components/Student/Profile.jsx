import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Table,
  Button,
  Badge,
} from "react-bootstrap";
import "./Profile.css";
import Msg from "../MassageBox/Msg";
import { DisplayMsg, FeePayment, ShiftAllot } from "../Index";
import { useNavigate, useParams } from "react-router-dom";
import {
  Datehandle,
  calculateMonthDifference,
  RemoveUser,
  ImageUrlSet,
  DeleteUserInLocalStorage,
} from "../Function";

function Profile() {
  const [shiftFeeData, setShiftFeeData] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const { id, adminId, key } = useParams();
  const navigator = useNavigate();

  /*---------------------Fetch the data page reloading time------------------------- */
  useEffect(() => {
    if (localStorage.getItem("User") === "Student") {
      /*--------If User is Student then fetch data from backend-------- */
      const UserData = localStorage.getItem("UserData");
      if (UserData) {
        setStudentDetails(JSON.parse(UserData));
      }
      const storedFeeShiftUserData = localStorage.getItem(`FeeShiftData${id}`);
      if (storedFeeShiftUserData) {
        setShiftFeeData(JSON.parse(storedFeeShiftUserData));
      }
    } else {
      /*----------If User is Admin, fetch student data from localStorage-------- */
      try {
        const UserData = localStorage.getItem("UserData");
        if (UserData) {
          const parsedUserData = JSON.parse(UserData);
          if (Array.isArray(parsedUserData)) {
            const studentDetails = parsedUserData[key];
            setStudentDetails(studentDetails);
          }
        }

        const storedFeeShiftUserData = localStorage.getItem(
          `FeeShiftData${id}`
        );
        if (storedFeeShiftUserData) {
          setShiftFeeData(JSON.parse(storedFeeShiftUserData));
        }
      } catch (error) {
        console.error("Error parsing JSON data from localStorage", error);
      }

      // Clean up student data when navigating back to the admin profile
      const handleBeforeUnload = (event) => {
        const currentPath = window.location.pathname;
        const adminPath = `/Dashboard/${adminId}`;
        if (currentPath === adminPath) {
          localStorage.removeItem("studentData");
          localStorage.removeItem("FeeShiftData");
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [id, adminId, key]);

  /*------------------------------------------------------------------------------------------------------ */

  /*---------------------------------------for chatBox--------------------------------------*/
  const [msgbox, setmsgbox] = useState(false);
  const hanldeMsgBox = () => {
    setmsgbox(!msgbox);
  };
  /*------------------------------------------------------------------------------------------------------ */
  const [feePay, setfeePay] = useState(false);
  const hanldefeePay = async (e) => {
    e.preventDefault();
    setfeePay(true);
    console.log("hello");
  };
  /*------------------------------------------------------------------------------------------------------ */

  /* ------------------------------------Set here which location show to screen----------------------------------- */
  const [ResidentalAddress, SetResidental] = useState(false);
  const [PermanentAddress, SetPermanent] = useState(false);
  const handleResidentalAddress = () => {
    SetResidental(!ResidentalAddress);
    SetPermanent(false);
  };
  const handlePermanetAddress = () => {
    SetResidental(false);
    SetPermanent(!PermanentAddress);
  };

  /*-------------------student Activation status set------------------------*/

  const [ShitfFee, setShitfFee] = useState(studentDetails?.Verify_tocken);
  const handleShiftFee = async () => {
    setShitfFee(true);
  };
  /*---------------------------------------------------------------------------*/

  /*------------------------------------------------Payment History------------------------------- */
  const PaymentRecordTable = [];
  let count = 1;
  let lastDateofPayment = Datehandle(studentDetails.Joining_date);

  /*    -------------------------------data store in Database------------------------------    */
  if (shiftFeeData?.paymentHistory) {
    shiftFeeData.paymentHistory.forEach((data, index) => {
      PaymentRecordTable.push(
        <tr key={index}>
          <th>{index + 1}</th>
          <th>{Datehandle(data.PaymentDate)}</th>
          <th>{Datehandle(data.startDate)}</th>
          <th>{Datehandle(data.EndDate)}</th>
          <th>{data.Payment}</th>
        </tr>
      );
      lastDateofPayment = data.EndDate;
      count++;
    });
  }

  /*    ------------------------data store in Rectently set it----------------------------    */
  const storedData = localStorage.getItem(`PaymentRecords${id}`);
  const paymentRecordsArray = storedData ? JSON.parse(storedData) : [];
  let paymentRecords = [];
  paymentRecordsArray.forEach((item) => {
    paymentRecords = item.PaymentRecords;
  });
  paymentRecords.forEach((data, index) => {
    PaymentRecordTable.push(
      <tr key={index + count}>
        <th>{index + count}</th>
        <th>{Datehandle(Date.now())}</th>
        <th>{Datehandle(data.startDate)}</th>
        <th>{Datehandle(data.EndDate)}</th>
        <th>{data.Payment}</th>
      </tr>
    );

    lastDateofPayment = data.EndDate;
  });
  const PendingMonthFee = calculateMonthDifference(
    lastDateofPayment,
    Date.now()
  );
  /*---------------------------------------------------------------------------*/

  /*-------------------------Remove the User From DataBase-------------------- */
  const hanldeRemove = () => {
    if (PendingMonthFee > 0) {
      alert("Thier Fee Are Pending");
    } else {
      const confirmDelete = window.confirm(
        "Do you really want to delete the user?"
      );
      if (confirmDelete) {
        alert("User deleted successfully.");
        RemoveUser(adminId, id);
        DeleteUserInLocalStorage(key);
        localStorage.removeItem(`FeeShiftData${id}`);
        navigator(`/Dashboard/${adminId}`);
      } else {
        alert("User deletion canceled.");
      }
    }
  };
  /*---------------------------------------------------------------------------*/

  const [showAadhar, setshowAadhar] = useState(false);
  const handlshowaadhar = () => {
    setshowAadhar(!showAadhar);
  };
  const verifyToken = studentDetails.Verify_tocken;
console.log(ImageUrlSet(studentDetails.Image));
  return (
    <>
      <Container
        class="justify-content-center align-items-center"
        style={{ marginTop: "2rem", minHeight: "30rem" }}
      >
        <div className={`PopUpELement ${showAadhar ? "d-block" : "d-none"}`}>
          <span
            onClick={handlshowaadhar}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "end",
              color: "red",
              cursor: "pointer",
            }}
          >
            <i class="bi bi-x-lg"></i>
          </span>
          <div className="d-flex justify-content-center align-content-center">
            <img
              src={ImageUrlSet(studentDetails?.Aadhar?.FrontAadharCardImage)}
              alt="Front of Aadhaar card"
              className="img-fluid mb-2 aadhar-card-img"
            />
            <img
              src={ImageUrlSet(studentDetails?.Aadhar?.BackAadharCardImage)}
              alt="Back of Aadhaar card"
              className="img-fluid mb-2 aadhar-card-img"
            />
          </div>
        </div>

        {adminId && ShitfFee ? (
          <>
            <ShiftAllot
              ShitfFee={ShitfFee}
              setShitfFee={setShitfFee}
              verifyToken={verifyToken}
              PendingMonthFee={PendingMonthFee}
            />
          </>
        ) : (
          ""
        )}
        {feePay ? (
          <>
            <FeePayment
              setShiftFeeData={setShiftFeeData}
              feePay={feePay}
              setfeePay={setfeePay}
              lastDateofPayment={lastDateofPayment}
              PerMonthFee={shiftFeeData.Fee}
            />
          </>
        ) : (
          ""
        )}
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body className="text-center" style={{ fontSize: "80%" }}>
                <Row>
                  <Col className="justify-content-center align-content-center">
                    <img
                      src={ImageUrlSet(studentDetails.Image)}
                      alt="Profile"
                      className="img-fluid rounded-circle mb-2"
                      style={{ width: "10rem", height: "10rem" }}
                    />
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "green",
                        cursor: "pointer",
                      }}
                    >
                      Student
                    </p>
                  </Col>
                  <Col className=" justify-content-center align-content-center text-start ">
                    <h3>{studentDetails.name}</h3>
                    <strong>Father Name:</strong>{" "}
                    <span> {studentDetails.father_name}</span>
                    <br />
                    <strong>Gender:</strong>{" "}
                    <span> {studentDetails.Gender}</span>
                    <br />
                    <strong>Date of Birth:</strong>{" "}
                    <span> {Datehandle(studentDetails.DOB)}</span>
                    <p onClick={handlshowaadhar} style={{ cursor: "pointer" }}>
                      <Badge> View Aadhar card Details</Badge>
                    </p>
                  </Col>
                </Row>
                <p>
                  {" "}
                  <strong>School/College Name: </strong>
                  <span>{studentDetails.School}</span>
                </p>
                <Row>
                  <Col>
                    <strong
                      onClick={handleResidentalAddress}
                      style={{
                        color: ResidentalAddress ? "green" : "black",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Residental Address
                      {ResidentalAddress ? (
                        <FaChevronUp style={{ marginLeft: "5px" }} />
                      ) : (
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                      )}
                    </strong>
                  </Col>

                  <Col>
                    <strong
                      onClick={handlePermanetAddress}
                      style={{
                        color: PermanentAddress ? "green" : "black",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Permanent Address
                      {PermanentAddress ? (
                        <FaChevronUp style={{ marginLeft: "5px" }} />
                      ) : (
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                      )}
                    </strong>
                  </Col>
                </Row>

                <Row>
                  {ResidentalAddress ? (
                    <p>
                      {studentDetails?.ResidentalAddress?.village || "N/A"},
                      {studentDetails?.ResidentalAddress?.post || "N/A"},
                      <br />
                      {studentDetails?.ResidentalAddress?.district || "N/A"},
                      {studentDetails?.ResidentalAddress?.state || "N/A"},
                      {studentDetails?.ResidentalAddress?.country || "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                  {PermanentAddress ? (
                    <p>
                      {studentDetails?.PermanentAddress?.village || "N/A"},
                      {studentDetails?.PermanentAddress?.post || "N/A"},
                      <br />
                      {studentDetails?.PermanentAddress?.district || "N/A"},
                      {studentDetails?.PermanentAddress?.state || "N/A"},
                      {studentDetails?.PermanentAddress?.country || "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                </Row>
                <Row>
                  <strong>Contact Details:</strong>
                  <Col>
                    <strong>Email:</strong>
                    <span>{studentDetails.Email}</span>
                  </Col>
                  <Col>
                    <strong>Contact Number:</strong>
                    <span>{studentDetails.Phone_number}</span>
                  </Col>
                </Row>

                {localStorage.getItem("User") === "Admin" && verifyToken ? (
                  <Button onClick={hanldeRemove}>Remove Student</Button>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="mb-3">Entry Details</Card.Title>
                {verifyToken ? (
                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Joining :</strong>{" "}
                          {Datehandle(studentDetails.Joining_date)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Pending fee:</strong>
                          {PendingMonthFee > 0 ? (
                            <>
                              {" "}
                              {PendingMonthFee}Month
                              {"  "}
                            </>
                          ) : (
                            "No Fee pending"
                          )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {localStorage.getItem("User") === "Admin" ? (
                            <Button onClick={hanldefeePay}>
                              Make A Payment
                            </Button>
                          ) : (
                            ""
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <strong>Fee Details:</strong> {shiftFeeData.Fee}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Shift:</strong> {shiftFeeData.Shift}
                          </ListGroup.Item>
                          {localStorage.getItem("User") === "Admin" ? (
                            <ListGroup.Item>
                              <Button onClick={handleShiftFee}>
                                Update Shift and Fee
                              </Button>
                            </ListGroup.Item>
                          ) : (
                            ""
                          )}
                        </ListGroup>
                      </>
                    </Col>
                  </Row>
                ) : (
                  <Button onClick={handleShiftFee}>
                    Set the Activation of Student Id by Fee & Shift
                  </Button>
                )}
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Fee Payment History</Card.Title>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {PaymentRecordTable.length > 0 ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Payment Date</th>
                          <th>From</th>
                          <th>to</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>{PaymentRecordTable}</tbody>
                    </Table>
                  ) : (
                    ""
                  )}
                </div>
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <h5
                style={{
                  cursor: "pointer",
                  backgroundColor: msgbox ? "#e9ecef" : "transparent",
                  padding: "10px",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease-in-out",
                }}
                onClick={hanldeMsgBox}
              >
                Leave a message for Admin
              </h5>
              <div
                className="d-flex zp-2 rounded shadow-sm"
                style={{ transition: "all 0.3s ease-in-out" }}
              >
                {msgbox ? <Msg /> : ""}
              </div>
              <DisplayMsg />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
