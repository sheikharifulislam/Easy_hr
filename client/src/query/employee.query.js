import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, getAllEmployees } from "../services/employee.service";

export const useGetAllEmployee = (args) => {
    return useQuery({
        queryKey: ["employee", args.page],
        queryFn: () => getAllEmployees(args.page),
        placeholderData: keepPreviousData,
    });
};

export const useCreateEmployee = () => {
    return useMutation({
        mutationFn: createEmployee,
    });
};
