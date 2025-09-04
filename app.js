import express from "express";
import employees from "./api/employees.js"

const app = express();

app.use(express.json());

// TODO: this file!
app.use("/", employees);

app.use((req, res, next, err) => {
    console.error(error)
    res.status(500).send(error)
});

export default app;