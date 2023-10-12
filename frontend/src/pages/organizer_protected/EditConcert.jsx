import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import AuthContext from "../../context/AuthContext";
import NotFound from "../NotFound";
import { useFormik } from "formik";
import { ConcertSchema } from "../../schema/ConcertSchema";
import { PurpleButton, RedButton } from "../../components/CustomizedMaterials";
import ProfileBackgroundHero from "../../components/ProfileBackgroundHero";
import { imageUploadPreview } from "../../utils/DataUtils";
import { apiStaticURL, mediaBaseUrl } from "../../utils/APIUtils";
import TicketContainer from "../../components/organizer_protected/TicketContainer";
import TicketContext from "../../context/TicketContext";
import DeleteConcertModals from "../../components/modals/DeleteConcertModals";

const EditConcert = () => {
  const { concertName } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  let [concertFields, setConcertFields] = useState(undefined);
  let [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState();

  const { setDateMin, setDateMax } = useContext(TicketContext);
  const [modalConcertDelete, setModalConcertDelete] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const fetchConcert = async () => {
      await axiosTokenIntercept
        .get(`/api/organizer/concert/`, {
          params: { concert_name: concertName },
        })
        .then((result) => {
          console.log(result.data);
          setConcertFields(result.data);
          setDateMin(result.data["dateValidRange1"]);
          setDateMax(result.data["dateValidRange2"]);
          setValues({
            name: result.data["name"],
            limit: result.data["limit"],
            paragraph: result.data["paragraph"],
            id: result.data["id"],
          });
          setImagePreview(
            `${mediaBaseUrl}${apiStaticURL}${result.data["bannerImg"]}`
          );
          setData(result.data["ticket"]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (isLoaded !== true) {
      fetchConcert();
    }

    return () => {
      setIsLoaded(true);
    };
    // eslint-disable-next-line
  }, []);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setValues,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      limit: "",
      bannerImg: null,
      paragraph: "",
      id: "",
    },
    validationSchema: ConcertSchema,
    onSubmit: (values) => {
      axiosTokenIntercept
        .patch(`/api/organizer/concert/`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  if (!concertFields) {
    return null;
  }
  if (!Number.isInteger(concertFields)) {
    return (
      <>
        <ProfileBackgroundHero>
          <div className="d-flex align-items-end justify-content-between mb-4 ">
            <h1 className="m-0 p-0">Edit Concert</h1>
            <RedButton
              className="p-3"
              onClick={() => setModalConcertDelete(true)}
            >
              DELETE EVENT
            </RedButton>
          </div>
          <form onSubmit={handleSubmit} className="border-top border-info pt-3">
            <div className="mb-3">
              <div className="aspect-ratio-container">
                <img src={imagePreview} alt="" />
              </div>
              <input
                className={
                  errors.bannerImg ? "form-control is-invalid" : "form-control"
                }
                type="file"
                id="bannerImg"
                onChange={(e) => {
                  imageUploadPreview(
                    "bannerImg",
                    e.target.files[0],
                    setFieldValue,
                    setImagePreview
                  );
                }}
                onBlur={(e) => {
                  setFieldTouched("bannerImg");
                }}
                accept="image/jpeg, image/png"
              />
              {errors.bannerImg && touched.bannerImg ? (
                <div className="feedback-invalid mt-2">{errors.bannerImg}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Concert name
              </label>
              <input
                className={
                  errors.name ? "form-control is-invalid" : "form-control"
                }
                type="text"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <div className="feedback-invalid mt-2">{errors.name}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="paragraph" className="form-label">
                Paragraph
              </label>
              <textarea
                className={
                  errors.paragraph ? "form-control is-invalid" : "form-control"
                }
                type="text"
                cols="80"
                rows="5"
                id="paragraph"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.paragraph}
              ></textarea>
              {errors.paragraph && touched.paragraph ? (
                <div className="feedback-invalid mt-2">{errors.paragraph}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="limit" className="form-label">
                Ticket limit
              </label>
              <input
                className={
                  errors.limit ? "form-control is-invalid" : "form-control"
                }
                type="number"
                id="limit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.limit}
                accept="image/jpeg, image/png"
              />
              {errors.limit && touched.limit ? (
                <div className="feedback-invalid mt-2">{errors.limit}</div>
              ) : null}
            </div>
            {/*
            <div className='mb-3'>
              <Calendar onChange={onChange} value={dateValue} selectRange={true} minDate={new Date()} calendarType='iso8601'/>
            </div>
          */}
            <div className="mt-3">
              <PurpleButton type="submit" className="px-5 py-2">
                Edit
              </PurpleButton>
            </div>
          </form>
        </ProfileBackgroundHero>

        <ProfileBackgroundHero>
          <h1 className="row mb-4 m-0">Ticket Manager</h1>
          <TicketContainer id={concertFields.id} />
        </ProfileBackgroundHero>

        <DeleteConcertModals
          show={modalConcertDelete}
          onHide={() => setModalConcertDelete(false)}
          concertId={concertFields?.id}
        />
      </>
    );
  } else if (concertFields === 404) {
    return <NotFound />;
  } else {
    return <div>Something went wrong</div>;
  }
};

export default EditConcert;
