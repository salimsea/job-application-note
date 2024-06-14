import { useCallback } from "react";
import { ButtonPagination } from "src/components/atoms";

export const Pagination = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const btnGotoPage = (val) => {
    scrollToTop();
    gotoPage(val);
  };

  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <ButtonPagination
        key={pageIndexToMap}
        content={pageIndexToMap + 1}
        onClick={() => btnGotoPage(pageIndexToMap)}
        active={pageIndex === pageIndexToMap}
      />
    ));
  }, [pageCount, pageIndex]);
  return (
    <>
      <ul className="body pagination pagination-primary">
        <ButtonPagination
          content={"Previous"}
          onClick={() => btnGotoPage(0)}
          disabled={!canPreviousPage}
        />
        {renderPageLinks()}

        <ButtonPagination
          content={"Next"}
          onClick={() => btnGotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </ul>
    </>
  );
};
