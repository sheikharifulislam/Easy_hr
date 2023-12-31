import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUploadCsv } from "../../query/employee.query";

const UploadCsv = ({ onClose }) => {
    const [file, setFile] = useState("");
    const { isPending, mutateAsync: uploadCsvMutation } = useUploadCsv();
    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.nativeEvent.dataTransfer.files;
        setFile(files[0]);
    };

    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
    };

    const preventDragoverBehavior = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (file.type !== "text/csv") {
            return toast.error("You can upload only CSV file");
        }
        const formData = new FormData();
        formData.append("employees", file);
        const result = await uploadCsvMutation(formData);
        if (result) {
            onClose();
            const errorOnColMessage = `But the problem was ${result?.errorOnCol} number column of CSV.so system remove this column`;
            toast.success(`Successfully uploaded file. ${result?.errorOnCol ? errorOnColMessage : ""} `);
        }
    };

    return (
        <form onSubmit={handleFileUpload}>
            <div
                className="flex items-center justify-center w-full"
                onDragOver={preventDragoverBehavior}
                onDrop={handleFileDrop}
            >
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {!file ? (
                            <>
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Only CSV File Accept (MAX File Size 3 MB)
                                </p>
                            </>
                        ) : (
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                {file.name} file has been selected
                            </p>
                        )}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileInput} />
                </label>
            </div>
            <Button type="submit" className="mt-3" disabled={isPending} isLoading={isPending}>
                Submit
            </Button>
        </form>
    );
};

UploadCsv.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UploadCsv;
