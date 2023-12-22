import { Button, Input, Textarea } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import { TableContext } from "../../context/TableProvider";
import { useSendEmails } from "../../query/employee.query";
import { emailSchema } from "../../validator";

const SendEmail = ({ onClose }) => {
    const [emailData, setEmailData] = useState({});
    const [errors, setErrors] = useState({});
    const { isPending, mutateAsync: sentEmailsMutation } = useSendEmails();
    const { selectedEmails, setSelectedEmails } = useContext(TableContext);

    const handleEmailData = (e) => {
        const { name, value } = e.target;
        setEmailData((prv) => ({
            ...prv,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateData = await emailSchema.validate(emailData, { abortEarly: false });
            if (validateData) {
                setErrors({});
                const result = await sentEmailsMutation({
                    ...validateData,
                    receivers: [...selectedEmails],
                });
                if (result.message) {
                    setSelectedEmails(new Set([]));
                    onClose();
                    toast(result.message);
                }
            }
        } catch (e) {
            if (e instanceof ValidationError) {
                const yupErrors = {};
                for (let i = 0; i < e.inner.length; i++) {
                    yupErrors[e.inner[i].path] = e.inner[i].message;
                }
                setErrors(yupErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                autoFocus
                label="Email Subject"
                placeholder="Enter your Email Subject"
                variant="bordered"
                className="mt-2"
                isRequired
                isInvalid={errors["subject"]}
                errorMessage={errors["subject"]}
                name="subject"
                onChange={handleEmailData}
            />
            <Textarea
                variant="bordered"
                name="body"
                isRequired
                label="Email Description"
                placeholder="Enter your Email Description"
                isInvalid={errors["body"]}
                errorMessage={errors["body"]}
                className="w-full mt-4"
                onChange={handleEmailData}
            />
            <Button type="submit" className="mt-3" disabled={isPending} isLoading={isPending}>
                Send
            </Button>
        </form>
    );
};

SendEmail.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SendEmail;
