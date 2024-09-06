import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: any;
  itemsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const hanglePage = (currentPage: any) => {
    if (currentPage < totalItems / itemsPerPage + 2) {
      setCurrentPage(currentPage);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={true}
            className="hover:bg-pink-300 cursor-pointer"
            onClick={() => hanglePage(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={false}
            className="hover:bg-pink-300 cursor-pointer"
            onClick={() => hanglePage(currentPage + 1)}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={false}
            className="hover:bg-pink-300 cursor-pointer"
            onClick={() => hanglePage(currentPage + 3)}
          >
            {currentPage + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationNext onClick={() => handleNextPage()} />
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationSection;
