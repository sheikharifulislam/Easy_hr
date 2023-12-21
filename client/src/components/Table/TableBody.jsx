const TableBody = ({ items }) => {
    console.log("from TableBody", items);
    return (
        <h1>table body</h1>
        // <NextUiTableBody items={items}>
        //     {(item) => {
        //         console.log(item);
        //         return (
        //             <TableRow key={item.name}>
        //                 {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
        //             </TableRow>
        //         );
        //     }}
        // </NextUiTableBody>
    );
};

export default TableBody;
