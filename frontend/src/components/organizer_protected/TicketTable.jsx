import React, { useContext, useMemo, useState } from "react";
import useFetchTicketType from "../../customHooks/useFetchTicketType";

import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-teal/theme.css";
import TicketContext from "../../context/TicketContext";

const TicketTable = ({ ticketTypeID, currentTicketTypeActive }) => {
  const [responseData, serverResponseCode] = useFetchTicketType(
    `/api/ticket/${ticketTypeID}`,
    false,
    currentTicketTypeActive
  );

  const { selectedTickets, setSelectedTickets } = useContext(TicketContext);

  const data = useMemo(() => responseData, [responseData]);

  if (serverResponseCode !== 200) {
    return <>No tickets found</>;
  }
  return (
    <div className="ticketInfoTable me-3">
      <DataTable
        value={data}
        stripedRows
        removableSort
        showGridlines
        selection={selectedTickets}
        onSelectionChange={(e) => setSelectedTickets(e.value)}
        dataKey="id"
      >
        <Column selectionMode="multiple"></Column>
        <Column field="id" header="ID" sortable></Column>
        <Column field="date_created" header="Date Created" sortable></Column>
        <Column field="isUsed" header="Is Used" sortable></Column>
        <Column field="boughtBy" header="Ticket Claimed by" sortable></Column>
      </DataTable>
    </div>
  );
};

export default TicketTable;
