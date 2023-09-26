import { React, useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { OrganizerContext } from "../../pages/organizer_protected/OrganizerDashboard";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import dayjs from "dayjs";
import { apiStaticURL, mediaBaseUrl } from "../../utils/APIUtils";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import TextField from "@mui/material/TextField";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { PurpleButton } from "../CustomizedMaterials";
import { motion } from "framer-motion";

const OrganizerInfo_card = () => {
  const { concert, setConcert } = useContext(OrganizerContext);
  const { userDeepDetails, setUserDeepDetails, logout } =
    useContext(AuthContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axiosTokenIntercept
      .get(`/api/user/`)
      .then((result) => {
        setUserDeepDetails(result.data);
      })
      .catch(() => {
        logout();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredItems = [];
  if (concert !== undefined) {
    filteredItems = concert.filter((item) => {
      return item["name"].toLowerCase().includes(query.toLowerCase());
    });
  }

  const returnTotalValue = (ticketArr) => {
    var totalPrice = 0;
    for (let index = 0; index < ticketArr.length; index++) {
      totalPrice = totalPrice + ticketArr[index]["price"];
    }
    return totalPrice;
  };

  const navigate = useNavigate();
  const navigateTo = (linkStr, linkID) => {
    navigate(`${linkStr}/edit`);
  };

  /**
   *  SORT STATE DIRECTION
   * 0 = INACTIVE SIGNAL
   * 1 = ASCENDING
   * 2 = DESCENDING
   */
  const [sortStateDirection, setSortStateDirection] = useState({
    alphabet: 0,
    eventDate: 0,
    revenue: 0,
  });

  const sortButton = async (command) => {
    if (command === "alphabet") {
      if (sortStateDirection["alphabet"] === 0) {
        // ASCENDING FUNCTION HERE
        //
        const sortedItems = [...filteredItems].sort((a, b) =>
          a["name"].localeCompare(b["name"])
        );
        setConcert(sortedItems);

        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 1,
          eventDate: 0,
          revenue: 0,
        });
      } else if (sortStateDirection["alphabet"] === 1) {
        // Descending FUNCTION HERE
        //
        const sortedItems = [...filteredItems].sort((a, b) =>
          b["name"].localeCompare(a["name"])
        );
        setConcert(sortedItems);

        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 2,
          eventDate: 0,
          revenue: 0,
        });
      } else if (sortStateDirection["alphabet"] === 2) {
        const sortedItems = [...filteredItems].sort((a, b) =>
          a["name"].localeCompare(b["name"])
        );
        setConcert(sortedItems);

        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 0,
          eventDate: 0,
          revenue: 0,
        });
      }
    }

    if (command === "eventDate") {
      if (sortStateDirection["eventDate"] === 0) {
        const sortedItems = [...filteredItems].sort((a, b) =>
          a["dateValidRange1"].localeCompare(b["dateValidRange1"])
        );
        setConcert(sortedItems);
        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 0,
          eventDate: 1,
          revenue: 0,
        });
      } else if (sortStateDirection["eventDate"] === 1) {
        const sortedItems = [...filteredItems].sort((a, b) =>
          b["dateValidRange1"].localeCompare(a["dateValidRange1"])
        );
        setConcert(sortedItems);
        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 0,
          eventDate: 2,
          revenue: 0,
        });
      } else if (sortStateDirection["eventDate"] === 2) {
        const sortedItems = [...filteredItems].sort((a, b) =>
          a["dateValidRange1"].localeCompare(b["dateValidRange1"])
        );
        setConcert(sortedItems);
        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 0,
          eventDate: 0,
          revenue: 0,
        });
      }
    }

    if (command === "revenue") {
      if (sortStateDirection["revenue"] === 0) {
        // ASCENDING FUNCTION HERE
        const sortedItems = [...filteredItems].sort(
          (a, b) =>
            returnTotalValue(b["ticket"]) - returnTotalValue(a["ticket"])
        );
        setConcert(sortedItems);
        console.log(sortedItems);
        setSortStateDirection({
          ...sortStateDirection,
          alphabet: 0,
          eventDate: 0,
          revenue: 1,
        });
      }
      {
        /**
      else if (sortStateDirection["revenue"] === 1) {
         const sortedItems = [...filteredItems].sort(
           (a, b) =>
             returnTotalValue(a["ticket"]) - returnTotalValue(b["ticket"])
         );
         setConcerts(sortedItems);
         setSortStateDirection({
           ...sortStateDirection,
           alphabet: 0,
           eventDate: 0,
           revenue: 2,
         });
       } else if (sortStateDirection["revenue"] === 2) {
         // DESCENDING FUNCTION HERE
         const sortedItems = [...filteredItems].sort(
           (a, b) =>
             returnTotalValue(b["ticket"]) - returnTotalValue(a["ticket"])
         );
         setConcerts(sortedItems);
         setSortStateDirection({
           ...sortStateDirection,
           alphabet: 0,
           eventDate: 0,
           revenue: 0,
         });
       }
     */
      }
      // ASCENDING FUNCTION HERE
    }
  };

  const stateChecker = (stateName, theComponent) => {
    if (theComponent === "text") {
      if (sortStateDirection[stateName] === 1) {
        return "active";
      } else if (sortStateDirection[stateName] === 2) {
        return "active";
      } else {
        return null;
      }
    }
    if (theComponent === "icon") {
      if (sortStateDirection[stateName] === 1) {
        return <FaSortUp />;
      } else if (sortStateDirection[stateName] === 2) {
        return <FaSortDown />;
      } else {
        return <FaSort />;
      }
    }
  };

  if (filteredItems !== undefined && userDeepDetails !== undefined) {
    const firstLetter = userDeepDetails.username.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = userDeepDetails.username.slice(1);
    return (
      <div className="row align-items-start justify-content-between">
        <div className="col-12 info-card p-4 main-cards rounded">
          <h3>Welcome {firstLetterCap + remainingLetters}!</h3>
        </div>
        <div className="col-12 col-lg-4 p-4 mb-3 bg-dark text-white rounded">
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            color="primary"
            sx={{ width: "100%" }}
            className="pb-4"
            focused
            autoComplete="off"
          />
          <h4 className="bolder">Sort by</h4>
          <ul className="text-decoration-none d-flex justify-content-between mx-2 ">
            <li
              onClick={() => sortButton("alphabet")}
              className={stateChecker("alphabet", "text")}
            >
              Alphabet {stateChecker("alphabet", "icon")}
            </li>
            <li
              onClick={() => sortButton("eventDate")}
              className={stateChecker("eventDate", "text")}
            >
              Event Date{stateChecker("eventDate", "icon")}
            </li>
            <li
              onClick={() => sortButton("revenue")}
              className={stateChecker("revenue", "text")}
            >
              Revenue{stateChecker("revenue", "icon")}
            </li>
          </ul>
          <PurpleButton className="mt-4 p-3">Create Concert Event</PurpleButton>
        </div>
        <div className="col ms-0 ms-lg-5">
          <motion.div layout>
            {filteredItems.map((eachData) => (
              <motion.div key={eachData.id} layout>
                <Card
                  onClick={() => {
                    navigateTo(eachData.name, eachData.id);
                  }}
                  className="p-0 mb-4 mb-lg-5 user-select-none bg-dark text-light concertCard"
                >
                  <CardActionArea>
                    <CardMedia
                      sx={{ height: 300 }}
                      image={`${mediaBaseUrl}${apiStaticURL}${eachData.bannerImg}`}
                    />
                    <CardContent className="p-4 bg-dark text-light">
                      <div>
                        <div className="row justify-content-between">
                          <h3 className="fw-bold col">{eachData["name"]}</h3>
                          <span className="col text-end text-secondary">
                            Created At{" "}
                            <div className="fw-bolder text-light">
                              {dayjs(eachData["createdAt"]).format(
                                "MMMM DD, YYYY"
                              )}
                            </div>
                          </span>
                        </div>
                        <div className="row justify-content-between">
                          <h4 className="col text-info">{`${dayjs(
                            eachData["dateValidRange1"]
                          ).format("MMM DD")} - ${dayjs(
                            eachData["dateValidRange2"]
                          ).format("MMM DD")}`}</h4>
                          {/**
                          <h4 className="col text-end fw-lighter">
                            Ticket collected: {eachData["ticket"].length}
                          </h4>
                           * 
                           */}
                        </div>
                        {/**
                         * 
                         <h4 className='text-end'><span className='bg-success text-black px-3 rounded'>₱ {returnTotalValue(eachData['ticket'])}</span></h4>
                         * 
                         */}
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  } else {
    return <div>Loading....</div>;
  }
};

export default OrganizerInfo_card;
