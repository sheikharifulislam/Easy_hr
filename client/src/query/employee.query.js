import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEmployee, getAllEmployees, sendEmails } from "../services/employee.service";

export const useGetAllEmployee = (args) => {
    return useQuery({
        queryKey: ["employee", args.page],
        queryFn: () => getAllEmployees(args.page),
        placeholderData: keepPreviousData,
    });
};

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] });
        },
    });
};

export const useSendEmails = () => {
    return useMutation({
        mutationFn: sendEmails,
    });
};
