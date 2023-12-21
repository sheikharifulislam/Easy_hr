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
    return (
        <NextUiTable
            aria-label="Example table with client side pagination"
            selectionMode="multiple"
            bottomContent={
                <div className="flex w-full justify-center">
                    {!isLoading && (
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    )}
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
                    <TableRow key={employee._id}>
                        {(columnKey) => <TableCell>{getKeyValue(employee, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </NextUiTable>
    );
};

export default Table;
