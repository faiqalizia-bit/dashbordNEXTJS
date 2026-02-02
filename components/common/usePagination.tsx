import { useState } from "react";

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1)


  const goToPage = (p:number) => {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  };

  // const nextPage = () => {
  //   if (page < totalPages) setPage(page + 1);
  // };

  // const prevPage = () => {
  //   if (page > 1) setPage(page - 1);
  // };

  return {
    page,
    setPage: goToPage,
    // nextPage,
    // prevPage,
    totalPages,
    setTotalPages
  };
};

export default usePagination;