
import ReactPaginate from 'react-paginate'

type PaginateComponentProps = {
    totalPages: number | undefined;
    currentPage: number;
    handlePageClick: (event: { selected: number }) => void;
}

export default function PaginateComponent({totalPages, currentPage, handlePageClick} : PaginateComponentProps) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Siguiente>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={0}
            pageCount={totalPages ?? 0}
            forcePage={currentPage - 1}
            previousLabel="<Anterior"
            renderOnZeroPageCount={null}
            containerClassName=" max-md:text-sm flex items-center justify-center p-4 gap-2 text-lg text-text"
            pageClassName="w-10 h-10  flex items-center justify-center rounded-md"
            pageLinkClassName="cursor-pointer w-full h-full flex items-center justify-center"
            previousClassName="px-4 py-2 rounded-md"
            nextClassName="px-4 py-2 rounded-md"
            activeClassName="font-bold"
            disabledClassName="opacity-50 cursor-not-allowed"
        />
    )
}
