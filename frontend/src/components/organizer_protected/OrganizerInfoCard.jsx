import { React, useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { OrganizerContext } from "../../pages/organizer_protected/OrganizerDashboard";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import { apiStaticURL, mediaBaseUrl } from "../../utils/APIUtils";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import TextField from "@mui/material/TextField";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { PurpleButton } from "../CustomizedMaterials";
import { motion } from "framer-motion";
import CreateConcertModals from "../modals/CreateConcertModals";
import { format, parseISO } from "date-fns";

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
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredItems = [];
  if (concert !== undefined) {
    filteredItems = concert.filter((item) => {
      return item["name"].toLowerCase().includes(query.toLowerCase());
    });
  }

  const navigate = useNavigate();
  const navigateTo = (linkStr, linkID) => {
    navigate(`${linkStr}/edit`);
  };

  const [createConcertModalState, setCreateConcertModalState] = useState(false);

  if (filteredItems !== undefined && userDeepDetails !== undefined) {
    const firstLetter = userDeepDetails.username.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = userDeepDetails.username.slice(1);
    for (let i = 0; i < concert.length; i++) {
      let dateiso = concert[i]["createdAt"];

      console.log(parseISO(dateiso));
    }
    return (
      <div className="row align-items-start justify-content-between">
        <div className="col-12 info-card p-4 main-cards rounded">
          <h3>Welcome {firstLetterCap + remainingLetters}!</h3>
        </div>
        <div className="col-12 col-lg-4 p-4 mb-3 bg-dark text-white rounded customSticky">
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
          <PurpleButton
            className="p-3"
            onClick={() => setCreateConcertModalState(true)}
          >
            Create Concert Event
          </PurpleButton>
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
                            Created At
                            <div className="fw-bolder text-light">
                              {format(
                                parseISO(eachData["createdAt"]),
                                "MMMM dd, yyyy"
                              )}
                            </div>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <CreateConcertModals
          show={createConcertModalState}
          onHide={() => setCreateConcertModalState(false)}
        />
      </div>
    );
  } else {
    return <div>Loading....</div>;
  }
};

export default OrganizerInfo_card;
