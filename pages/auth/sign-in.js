import { Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import withPrivateRoute from "../../hoc/withPrivateRoute";
import MainLayout from "../../components/shared/MainLayout";
// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 5 characters"),
  captcha: Yup.string()
    .required("Captcha is required, please verify you are not a robot")
    .nullable(true),
});

function SignIn() {
  const session = useSession();
  const router = useRouter();
  const destination = router?.query?.destination;
  if (session.status === "authenticated") {
    router.push(
      destination && typeof destination === "string" ? destination : "/films"
    );
  }
  return (
    <MainLayout>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "", captcha: "" }}
        onSubmit={async (values) => {
          const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          if (res.status === 401) {
            router.push("/auth/error");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setErrors,
          setFieldValue,
        }) => (
          <div className="login">
            <div className="form" style={{ backgroundColor: "#F8FDFA" }}>
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id"
                  className="form-control inp_text"
                  id="email"
                />
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <div className="captcha-wrapper">
                  <ReCAPTCHA
                    sitekey={"6Lf736ggAAAAAPMH9LsOHUq1YgxLNp0nAFGPLddy"}
                    theme={"light"}
                    onChange={(value) => {
                      setErrors({});
                      setFieldValue("captcha", value);
                    }}
                    size={"normal"}
                  />
                </div>
                <p className="error">
                  {errors.captcha && touched.captcha && errors.captcha}
                </p>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </MainLayout>
  );
}

export default withPrivateRoute(SignIn);
