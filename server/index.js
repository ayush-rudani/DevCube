const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userR = require("./routes/user-routes");  //userRouter
const postR = require("./routes/post-routes");  //postRouter
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

app.use(express.json());
app.use("/api/user", userR);
app.use("/api/post", postR);

// Connect DataBase
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});


