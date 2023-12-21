const router = require("express").Router();
const { sendEmail } = require("../controller");
const { emailValidator } = require("../middlewares");

router.post("/", emailValidator, sendEmail);

module.exports = router;
