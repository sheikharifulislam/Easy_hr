const router = require("express").Router();
const { validateEmployee, fileUploader, parseCsvFiles, validateEmployees } = require("../middlewares");
const { createEmployee, getAllEmployees, insertMultipleEmployees } = require("../controller");

router.get("/", getAllEmployees);
router.post("/", validateEmployee, createEmployee);
router.post("/upload-csv", fileUploader, parseCsvFiles, validateEmployees, insertMultipleEmployees);

module.exports = router;
