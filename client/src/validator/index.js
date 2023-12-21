import { object, string } from "yup";

export const employeeSchema = object({
    firstName: string().min(3, "Must be at least 3 characters long").required("First name is require"),
    lastName: string().min(3, "Must be at least 3 characters long").required("Last name is require"),
    email: string().email("Provide valid email address").required("Email is require"),
});

export const emailSchema = object({
    subject: string().min(3, "Must be at least 3 characters long").required("Email Subject is required"),
    body: string().min(50, "Must be at least 50 characters long").required("Email Body is required"),
});
