import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import BaseModal from "./components/Modal/BaseModal";
import { Table } from "./components/Table";

import TableProvider from "./context/TableProvider";

function App() {
    const [page, setPage] = useState(1);
    const [modalName, setModalName] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = (currentModalName) => {
        setModalName(currentModalName);
        onOpen();
    };

    return (
        <div className="w-[80%] mx-auto ">
            <TableProvider>
                <Header handleOpen={handleOpen} />
                <Table page={page} setPage={setPage} />
                <BaseModal modalName={modalName} isOpen={isOpen} onClose={onClose} />
            </TableProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
