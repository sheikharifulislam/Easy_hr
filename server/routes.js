const router = require("express").Router();
const employeesRoutes = require("./modules/Employee/routes");

router.use("/employees", employeesRoutes);

module.exports = router;
