import { createContext, useState } from "react";

export const TableContext = createContext(null);

const TableProvider = ({ children }) => {
    const [selectedEmails, setSelectedEmails] = useState(new Set([]));
    return (
        <TableContext.Provider
            value={{
                selectedEmails,
                setSelectedEmails,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

export default TableProvider;
