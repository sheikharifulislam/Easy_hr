const emailServices = require("../service");

exports.sendEmail = async (req, res, next) => {
    try {
        const { subject, body, receivers } = req.body;
        const result = await emailServices.sendEmail({
            subject,
            text: body,
            receivers,
        });

        if (result.messageId) {
            return res.status(200).json({
                message: "Successfully send all emails",
            });
        }
    } catch (e) {
        next(e);
    }
};
