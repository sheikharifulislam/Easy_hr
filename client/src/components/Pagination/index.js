import { Pagination as NextUiPagination } from "@nextui-org/react";

const Pagination = ({ page, pages, setPage }) => {
    return (
        <NextUiPagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
        />
    );
};

export default Pagination;
