const router = require("express").Router();
const employeesRoutes = require("./modules/Employee/routes");
const emailRoutes = require("./modules/External/Email/routes");

router.use("/employees", employeesRoutes);
router.use("/email", emailRoutes);

module.exports = router;
