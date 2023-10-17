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

import {
  DatePickerField,
  InputTextField,
  TextAreaField,
  InputNumberField,
} from "../../components/FormFields";
import { format, parse } from "date-fns";

const EditConcert = () => {
  const { concertName } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  let [concertFields, setConcertFields] = useState(undefined);
  let [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState();

  const [localDateMin, setLocalDateMin] = useState(null);
  const { setDateMin, setDateMax } = useContext(TicketContext);
  const [modalConcertDelete, setModalConcertDelete] = useState(false);

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
      address: "",
      city: "",
      province: "",
      postal: "",
      bannerImg: null,
      paragraph: "",
      id: "",
      dateValidRange1: new Date(),
      dateValidRange2: null,
    },
    validationSchema: ConcertSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        address: values.address,
        city: values.city,
        province: values.province,
        postal: values.postal,
        bannerImg: values.bannerImg,
        paragraph: values.paragraph,
        organizerId: user.user_id,
        dateValidRange1: format(values.dateValidRange1, "yyyy-MM-dd"),
        dateValidRange2: format(values.dateValidRange2, "yyyy-MM-dd"),
        id: values.id,
      };
      axiosTokenIntercept
        .patch(`/api/organizer/concert/`, payload, {
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

  const validateBannerImg = (value) => undefined;
  // Override the validation function for the bannerImg field
  useEffect(() => {
    setIsLoaded(false);
    const fetchConcert = async () => {
      await axiosTokenIntercept
        .get(`/api/organizer/concert/`, {
          params: { concert_name: concertName },
        })
        .then((result) => {
          setConcertFields(result.data);
          setLocalDateMin(
            parse(result.data["dateValidRange1"], "yyyy-MM-dd", new Date())
          );
          setDateMin(result.data["dateValidRange1"]);
          setDateMax(result.data["dateValidRange2"]);
          setValues({
            name: result.data["name"],
            limit: result.data["limit"],
            address: result.data["address"],
            city: result.data["city"],
            province: result.data["province"],
            postal: result.data["postal"],
            paragraph: result.data["paragraph"],
            id: result.data["id"],
            dateValidRange1: parse(
              result.data["dateValidRange1"],
              "yyyy-MM-dd",
              new Date()
            ),
            dateValidRange2: parse(
              result.data["dateValidRange2"],
              "yyyy-MM-dd",
              new Date()
            ),
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

            <InputTextField
              labelName="Concert Name"
              formikFieldName="name"
              propError={errors.name}
              propTouched={touched.name}
              values={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextAreaField
              labelName="Paragraph"
              formikFieldName="paragraph"
              propError={errors.paragraph}
              propTouched={touched.paragraph}
              onChange={handleChange}
              values={values.paragraph}
              onBlur={handleBlur}
            />
            <div className="mb-3 row">
              <InputTextField
                labelName="Address"
                formikFieldName="address"
                className="col"
                propError={errors.address}
                propTouched={touched.address}
                values={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputNumberField
                labelName="Postal"
                className="col-4"
                formikFieldName="postal"
                propError={errors.postal}
                propTouched={touched.postal}
                values={values.postal}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-3 row align-items-start">
              <InputTextField
                className="col"
                labelName="City"
                formikFieldName="city"
                propError={errors.city}
                propTouched={touched.city}
                values={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputTextField
                className="col"
                labelName="Province"
                formikFieldName="province"
                propError={errors.province}
                propTouched={touched.province}
                values={values.province}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-3 d-flex flex-row">
              <DatePickerField
                labelName="Start Date"
                formikFieldName="dateValidRange1"
                propError={errors.dateValidRange1}
                propTouched={touched.dateValidRange1}
                propValue={values.dateValidRange1}
                minDate={localDateMin}
                maxDate={values.dateValidRange2}
                onBlur={handleBlur}
                onChange={(value) => setFieldValue("dateValidRange1", value)}
              />
              <DatePickerField
                labelName="End Date"
                formikFieldName="dateValidRange2"
                propError={errors.dateValidRange2}
                propTouched={touched.dateValidRange2}
                propValue={values.dateValidRange2}
                minDate={values.dateValidRange1}
                onBlur={handleBlur}
                onChange={(value) => setFieldValue("dateValidRange2", value)}
              />
            </div>
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
