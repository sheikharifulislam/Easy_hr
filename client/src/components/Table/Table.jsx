import {
    Table as NextUiTable,
    Pagination,
    Spinner,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";
import { useContext } from "react";
import { TableContext } from "../../context/TableProvider";

const tableHeaders = [
    {
        name: "firstName",
        value: "First Name",
    },
    {
        name: "lastName",
        value: "Last Name",
    },
    {
        name: "email",
        value: "Email Address",
    },
];

const Table = ({ employees = [], page, pages, setPage, isPlaceholderData, isLoading }) => {
    const { selectedEmails, setSelectedEmails } = useContext(TableContext);

    return (
        <NextUiTable
            aria-label="Example table with client side pagination"
            selectionMode="multiple"
            color="primary"
            onSelectionChange={setSelectedEmails}
            selectedKeys={[...selectedEmails]}
            bottomContent={
                <div className="flex w-full justify-center">
                    {!isLoading && employees.length > 0 ? (
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    ) : null}
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
                tbody: "min-h-[22px]",
            }}
        >
            <TableHeader>
                {tableHeaders.map((item) => (
                    <TableColumn key={item.name}>{item.value}</TableColumn>
                ))}
            </TableHeader>

            <TableBody
                {...(employees.length === 0 && !isLoading ? { emptyContent: "No Data Found." } : {})}
                items={employees}
                loadingContent={<Spinner />}
                loadingState={isPlaceholderData || isLoading ? "loading" : "idle"}
            >
                {(employee) => (
                    <TableRow key={employee.email}>
                        {(columnKey) => <TableCell>{getKeyValue(employee, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </NextUiTable>
    );
};

export default Table;
