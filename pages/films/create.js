import React, { useState } from "react";
import MainLayout from "../../components/shared/MainLayout";
import { Formik } from "formik";
import * as Yup from "yup";
const schema = Yup.object().shape({
  title: Yup.string().required("Movie name is a required field"),
  overview: Yup.string()
    .required("Description is a required field")
    .min(30, "Description must be at least 30 characters"),
  img: Yup.mixed().required("Image is required"),
});
import { useRouter } from "next/router";
const CreateFilm = () => {
  const [img, setImg] = useState();
  const router = useRouter();
  const handleCreate = (values) => {
    delete values.img;
    values = {
      ...values,
      img: img,
      manual: true,
    };
    let alreadyExistedFilm = localStorage.getItem("created");
    if (alreadyExistedFilm) {
      alreadyExistedFilm = JSON.parse(alreadyExistedFilm);
      alreadyExistedFilm.push(values);
      localStorage.setItem("created", JSON.stringify(alreadyExistedFilm));
    } else {
      localStorage.setItem("created", JSON.stringify([values]));
    }
    router.push({
      pathname: "/films",
    });
  };
  return (
    <MainLayout>
      <div className="form_box">
        <h1>Create Your Own Film 😉😉</h1>
        <Formik
          validationSchema={schema}
          initialValues={{ title: "", overview: "", img: "" }}
          onSubmit={(values) => {
            handleCreate(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
                  <label htmlFor="title">Movie Name</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="Enter your Fav. movie name"
                    className="form-control inp_text"
                    id="email"
                  />
                  <p className="error">
                    {errors.title && touched.title && errors.title}
                  </p>
                  <label htmlFor="overview">Description</label>
                  <textarea
                    type="text"
                    name="overview"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.overview}
                    placeholder="Describe your Fav. movie"
                    className="form-control"
                  />
                  <p className="error">
                    {errors.overview && touched.overview && errors.overview}
                  </p>
                  <label htmlFor="image">Image</label>
                  {img &&  img?.length ? (
                    <div className="img_wrapper">
                      <img src={img} alt="" />
                    </div>
                  ) : null}
                  <input
                    type="file"
                    name="img"
                    onChange={(e) => {
                      const [file] = e.target.files;
                      setImg(URL.createObjectURL(file));
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.img}
                    placeholder="Enter your Fav. movie name"
                    className="form-control inp_text"
                    id="email"
                  />
                  <p className="error">
                    {errors.img && touched.img && errors.img}
                  </p>
                  <button type="submit">Create</button>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default CreateFilm;
