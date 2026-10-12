import express from "express";
import { getEmployee, getEmployees, getRandomEmployee } from "#db/employees";

const app = express();
export default app;

import employeesRouter from "#api/employees";

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Error occurred.");
});
