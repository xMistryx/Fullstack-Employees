import express from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "#db/queries/employees";

const router = express.Router();

// TODO: this file!
router
.route("/")
.get(async (req, res) => {
    res.send("Welcome to the Fullstack Employees API.");
});

router
.route("/employees")
.get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
})
.post(async (req, res) => {
    try {
        const {name, birthday, salary} = req.body;
        if (!req.body || !name || !birthday || !salary) return res.status(400).send(error);
        const response = await createEmployee(name, birthday, salary);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
});

router
.route("/employees/:id")
.get(async (req, res) => {
    try {
        const {id} = req.params;
        const isValidNumber = (n) => {
            return n > 0 && !n.toString().includes("e");
        }
        const employee = await getEmployee(id);
        if (!employee) {
            return res.status(404).send({message: "employee not found"});
        }
        if (!isValidNumber(id)) {
            return res.status(400).send({message: "id not positive"});
        }
        return res.send(employee);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
.delete(async (req, res) => {
    try {
        const {id} = req.params;
        const isValidNumber = (n) => {
            return n > 0 && !n.toString().includes("e");
        }
        const employee = await getEmployee(id);
        if (!employee) {
            return res.status(404).send({message: "employee not found"});
        }
         if (!isValidNumber(id)) {
            return res.status(400).send({message: "id not positive"});
        }
        const response = await deleteEmployee(id);
        return res.status(204).send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
.put(async (req, res) => {
    try {
        const {id} = req.params;
        const isValidNumber = (n) => {
            return n > 0 && !n.toString().includes("e");
        }
        const { name, birthday, salary } = req.body;
        if (!req.body || !name || !birthday || !salary) res.status(400).send(error);
        const employee = await getEmployee(id);
        if (!employee) {
            return res.status(404).send({message: "employee not found"});
        }
        if (!isValidNumber(id)) {
            return res.status(400).send({message: "id not positive"});
        }
        const response = await updateEmployee(id, name, birthday, salary);
        return res.send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
  });

export default router;