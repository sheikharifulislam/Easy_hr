import { TableColumn, TableHeader } from "@nextui-org/react";

const TableHeaderCustom = () => {
    return (
        <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="role">ROLE</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
        </TableHeader>
    );
};

export default TableHeaderCustom;
