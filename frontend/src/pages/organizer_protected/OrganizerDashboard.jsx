import { React, useContext, useEffect, useState, createContext } from "react";
import OrganizerInfoCard from "../../components/organizer_protected/OrganizerInfoCard";
import AuthContext from "../../context/AuthContext";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import useFetchConcertPrivate from "../../customHooks/useFetchConcertPrivate";

const OrganizerDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [concert, serverResponseCode, setConcert] =
    useFetchConcertPrivate(`/api/concert/`);

  let contextDiary = {
    concert: concert,
    setConcert: setConcert,
  };

  return (
    <div className="row justify-content-between align-items-start">
      <OrganizerContext.Provider value={contextDiary}>
        <div className="col dashboard-main">
          <OrganizerInfoCard />
        </div>
      </OrganizerContext.Provider>
    </div>
  );
};

export const OrganizerContext = createContext();
export default OrganizerDashboard;
