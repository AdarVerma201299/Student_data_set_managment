const express = require("express");
const MongoDB = require("./Db");
const usersRoute = require("./Routes/usersRout");
const adminRoute = require("./Routes/adminRoute");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
MongoDB();
require("dotenv").config({ path: "./config.env" });

const app = express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://student-dataset-managment.onrender.com",
    ],
    credentials: true,
  })
);
app.use(cors());
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/api", usersRoute);
app.use("/api", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
