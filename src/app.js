const express = require("express");
const authRoutes = require("./routes/authRoutes");
const pool = require("./db/dbconnection");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
