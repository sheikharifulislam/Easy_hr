import { Button, Input } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import { useCreateEmployee } from "../../query/employee.query";
import { employeeSchema } from "../../validator";

const CreateEmployee = ({ onClose }) => {
    const [employee, setEmployee] = useState({});
    const [errors, setErrors] = useState({});
    const { isPending, mutateAsync: createEmployeeMutation } = useCreateEmployee();

    const handleEmployeeData = (e) => {
        const { name, value } = e.target;
        setEmployee((prv) => ({
            ...prv,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateData = await employeeSchema.validate(employee, { abortEarly: false });

            if (validateData) {
                setErrors({});
                const user = await createEmployeeMutation(validateData);
                if (user) {
                    onClose();
                    toast("Successfully created employee");
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
            <div className="flex justify-between">
                <Input
                    type="text"
                    autoFocus
                    label="First Name"
                    placeholder="Enter your First Name"
                    variant="bordered"
                    className="w-[49%]"
                    isRequired
                    isInvalid={errors["firstName"]}
                    errorMessage={errors["firstName"]}
                    name="firstName"
                    onChange={handleEmployeeData}
                />
                <Input
                    type="text"
                    autoFocus
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    variant="bordered"
                    className="w-[49%]"
                    isRequired
                    isInvalid={errors["lastName"]}
                    errorMessage={errors["lastName"]}
                    name="lastName"
                    onChange={handleEmployeeData}
                />
            </div>
            <Input
                type="email"
                autoFocus
                label="Email Address"
                placeholder="Enter your Email Address"
                variant="bordered"
                className="mt-2"
                isRequired
                isInvalid={errors["email"]}
                errorMessage={errors["email"]}
                name="email"
                onChange={handleEmployeeData}
            />

            <Button type="submit" className="mt-3" disabled={isPending} isLoading={isPending}>
                Submit
            </Button>
        </form>
    );
};

CreateEmployee.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CreateEmployee;
