import express from "express";
import { getEmployee, getEmployees, getRandomEmployee } from "#db/employees";

const router = express.Router();
export default router;

router.get("/", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
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
