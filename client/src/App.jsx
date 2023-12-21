import { useDisclosure } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import BaseModal from "./components/Modal/BaseModal";
import { Table } from "./components/Table";
import { useGetAllEmployee } from "./query/employee.query";

function App() {
    const [page, setPage] = useState(1);
    const [modalName, setModalName] = useState("");
    const {
        data: result = {},
        isLoading,
        isPlaceholderData,
    } = useGetAllEmployee({
        page,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const pages = useMemo(() => {
        const rowsPerPage = 5;
        return Math.ceil(result?.pagination?.total_records / rowsPerPage);
    }, [result?.pagination?.total_records]);

    const handleOpen = (currentModalName) => {
        setModalName(currentModalName);
        onOpen();
    };

    return (
        <div
            className="container mx-auto "
            style={{
                width: "80%",
                margin: "0 auto",
                marginTop: "50px",
            }}
        >
            <Header handleOpen={handleOpen} />
            <Table
                employees={result?.data}
                page={page}
                pages={pages}
                setPage={setPage}
                isPlaceholderData={isPlaceholderData}
                isLoading={isLoading}
            />
            <BaseModal modalName={modalName} isOpen={isOpen} onClose={onClose} />
            <ToastContainer />
        </div>
    );
}

export default App;
