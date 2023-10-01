import React, { useState } from "react";
import { createContext } from "react";

const TicketContext = createContext();
export default TicketContext;

export const TicketProvider = ({ children }) => {
  const [ticketTypeList, setTicketTypeList] = useState();
  const [ticketTypeInfo, setTicketTypeInfo] = useState();
  const [isModified, setIsModified] = useState(false);
  const [dateMin, setDateMin] = useState();
  const [dateMax, setDateMax] = useState();
  let content = {
    ticketTypeList: ticketTypeList,
    setTicketTypeList: setTicketTypeList,
    isModified: isModified,
    setIsModified: setIsModified,
    dateMin: dateMin,
    setDateMin: setDateMin,
    dateMax: dateMax,
    setDateMax: setDateMax,
    ticketTypeInfo: ticketTypeInfo,
    setTicketTypeInfo: setTicketTypeInfo,
  };

  return (
    <TicketContext.Provider value={content}>{children}</TicketContext.Provider>
  );
};
