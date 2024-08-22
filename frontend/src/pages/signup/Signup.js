import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { registerUser } from "../../reducers/userDataSlice";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Signup = ({ setIsUserLoggedin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // register(values);
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        setIsUserLoggedin(true);
        navigate("../");
      } else {
        setIsUserLoggedin(false);
        toast.error(resultAction.payload || "Sign Up failed");
      }
    },
  });

  return (
    <div className="signup">
      <header className="d-flex justify-content-center pt-3">
        <h1 className="title">My Blogs</h1>
      </header>
      <div className="row justify-content-center align-items-center h_80vh">
        <div className="col-12 col-lg-6 col-xl-4">
          <div className="login-form login-form-wrapper all-side-shadow container p-5">
            <form onSubmit={formik.handleSubmit}>
              <div className="row text-start mb-3">
                <h1 className="form_title p-2">Welcome To Family</h1>
                <p className="small_text text-start">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="fullName_input">
                <input
                  name="fullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Full Name"
                  value={formik.values.fullName}
                  type="text"
                  className={`form-control my-3 ${
                    formik.touched.fullName && formik.errors.fullName ? "is-invalid" : ""
                  }`}
                />
                <div className={formik.errors.fullName?"fullName_icon2":"fullName_icon"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </div>
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="invalid-feedback">{formik.errors.fullName}</div>
                ) : null}
              </div>
              <div className="email_input">
                <input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  className={`form-control my-3 ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email address"
                  value={formik.values.email}
                />
                {/* <div className="email_icon"> */}
                <div className={formik.errors.fullName?"email_icon2":"email_icon"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="password_input mb-3">
                <input
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPassword ? "text" : "password"}
                  className={`form-control my-3 ${
                    formik.touched.password && formik.errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="New Password"
                  value={formik.values.password}
                />
                {/* <div className="password_icon"> */}
                <div className={formik.errors.fullName?"password_icon2":"password_icon"}>
                  <span
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback">{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="new-account btn login-btn new-account-button mt-2 mb-3"
              >
                Sign up
              </button>
            </form>
            <div className="row">
              <div className="col-lg-12 text-center new-account">
                <Link to="/login" className="anchor">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
