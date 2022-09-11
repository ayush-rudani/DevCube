const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/user-routes");
const app = express();
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use((req, res, next) => {
//   res.send("Welcome to Express");
// });

app.use("/api/user", router)

// Connect DataBase
connectDB();


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});


