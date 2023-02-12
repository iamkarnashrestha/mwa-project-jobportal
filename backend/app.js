const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routers/usersRouter");
const jobsRouter = require("./routers/jobsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const {checkToken}=require('./middlewares/checkToken')

const { DB_SERVER } = require("./config.json");
mongoose
  .connect(DB_SERVER, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db Connected"))
  .catch((e) => console.log(e));

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes

app.use("/api/users/", usersRouter);
app.use("/api/jobs/",checkToken, jobsRouter);
app.use("/api/category/",checkToken, categoriesRouter);

app.all("*", async (req, res, next) => {
  next(new Error(`No Route found`));
});
app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
