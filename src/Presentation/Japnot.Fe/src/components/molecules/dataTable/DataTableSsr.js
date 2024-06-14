import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Pagination } from "../pagination";
import { IMGNotFound } from "src/assets/images/dummy";
import { useEffect } from "react";

export const DataTableSsr = ({
  data = [],
  column = [],
  pageIndex,
  setPageIndex,
  selectIndex,
  setSelectIndex,
}) => {
  var datas = data?.Data || [];
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  var columns = [];
  column.map((item) => {
    const columnConfig = {
      header: () => item.header,
      cell: (info) => (!item.selector ? info.getValue() : item.selector(info)),
      filterFn: "fuzzy",
    };
    columns.push(columnHelper.accessor(item.name, columnConfig));
  });

  const table = useReactTable({
    data: datas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  useEffect(() => {
    table.setPageSize(selectIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIndex]);

  return (
    <>
      <div className="flex flex-col">
        <div className="row align-items-center mb-3">
          <div className="col-md-2 d-flex align-items-center">
            Show
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                setSelectIndex(e.target.value);
              }}
              className="form-control mx-2 text-xs"
              style={{ width: "61px" }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            entries
          </div>
          <div className="col-md-10 d-flex justify-content-end">
            <div className="col-md-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  aria-describedby="basic-addon1"
                  aria-label="Search"
                  className="form-control"
                  type="text"
                  placeholder="Masukan Kata Kunci..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} scope="col">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {table.getRowModel().rows.length === 0 && (
            <center>
              <img
                src={IMGNotFound}
                alt="Not Found"
                width={200}
                height={200}
                className="img-fluid"
              />
              <p>Data tidak ada</p>
            </center>
          )}
        </div>

        <div className="row align-items-center">
          <div className="col-md-3">
            <p>
              Showing {table.getState().pagination.pageIndex + 1} to{" "}
              {table.getState().pagination.pageSize} of {data?.TotalPage}{" "}
              entries
            </p>
          </div>

          <div className="col-md-9 d-flex justify-content-end">
            <PaginationCategory
              pageCount={data?.TotalPage}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

function PaginationCategory({ setPageIndex, pageIndex, pageCount }) {
  return (
    <Pagination
      gotoPage={setPageIndex}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount - 1}
      pageCount={pageCount}
      pageIndex={pageIndex}
    />
  );
}
