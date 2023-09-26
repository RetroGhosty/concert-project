import React from "react";
import useFetchTicketType from "../../customHooks/useFetchTicketType";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TicketTable = ({ ticketTypeID, currentTicketTypeActive }) => {
  const [data, isDataLoaded, serverResponseCode, setData] = useFetchTicketType(
    `/api/ticket/${ticketTypeID}`,
    currentTicketTypeActive
  );

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "BOUGHT BY",
      accessorKey: "boughtBy",
    },
    {
      header: "IS USED",
      accessorKey: "isUsed",
    },
    {
      header: "DATE CREATED",
      accessorKey: "date_created",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    flexRender,
    getCoreRowModel: getCoreRowModel(),
  });

  if (serverResponseCode !== 200) {
    return <>No tickets found</>;
  }

  return (
    <div className="ticketInfoTable me-3">
      <table className="table table-dark table-striped">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
