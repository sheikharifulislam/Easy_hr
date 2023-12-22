import PropTypes from "prop-types";
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

TableProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TableProvider;
