import express from "express";
import {
  getEmployee,
  getEmployees,
  getRandomEmployee,
  addEmployee,
} from "#db/employees";

const router = express.Router();
export default router;

router.get("/", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
});

router.post("/", (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .send("No request body given. Request body is required");

  const { name } = req.body;

  if (!name) {
    return res.status(400).send("No name given. Name is required.");
  }
  const employee = addEmployee(name);
  res.status(201).send(employee);
});

router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});
