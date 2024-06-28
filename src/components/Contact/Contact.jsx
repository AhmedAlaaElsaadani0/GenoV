import React, { useState } from "react";
import style from "./Contact.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import logo from "../../assets/Images/Logo.png";
import axios from "axios";

export default function Contact() {
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState(null);
  const sendMessage = (values) => {
    let data = JSON.stringify({
      Name: values.name,
      Email: values.email,
      Message: values.message,
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setResponseFlag(true);
    axios
      .post("https://genov.izitechs.com/contact", data, config)
      .then((response) => {
        console.log(response);
        let res = response.data;
        if (res.status && res.status == 200) {
          setResMessage({ flag: true, message: res.message });
        } else {
          setResMessage({
            flag: false,
            message: "Something went wrong, please try again later",
          });
        }

        setResponseFlag(false);
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
        setResponseFlag(false);
        setResMessage({
          flag: false,
          message: "Something went wrong, please try again later",
        });
      });
  };

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: sendMessage,
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length < 3) {
        errors.name = "Must be 3 characters or more";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.message) {
        errors.message = "Required";
      } else if (values.message.length < 10) {
        errors.message = "Must be 10 characters or more";
      }
      return errors;
    },
  });
  return (
    <div className="w-50 container  ">
      <div
        className={
          "row bg-dark shadow rounded-5  overflow-hidden  text-white " +
          style.Contact
        }
      >
        <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <img src={logo} className="my-3" alt="Logo" />

          {resMessage != null ? (
            <div className={resMessage.flag ? style.success : style.error}>
              {resMessage.message}
            </div>
          ) : (
            ""
          )}
          <form onSubmit={myFormik.handleSubmit} action="" className="w-75">
            {/* Contact us */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.name}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
              {myFormik.errors.name && myFormik.touched.name ? (
                <div className="text-danger">{myFormik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.email}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
              {myFormik.errors.email && myFormik.touched.email ? (
                <div className="text-danger">{myFormik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                value={myFormik.values.message}
                id="message"
                placeholder="Enter your message"
              />
              {myFormik.errors.message && myFormik.touched.message ? (
                <div className="text-danger">{myFormik.errors.message}</div>
              ) : null}
            </div>
            <button type="submit">

              {responseFlag ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={"bi bi-arrow-counterclockwise " + style.spinner}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                </svg>
              ) : (
                "Submit Message"
              )}
            </button>
          </form>
        </div>

        <div
          className="bg-warning d-flex justify-content-center align-items-center gap-3 flex-column col-md-6 "
          style={{ borderRadius: "150px 0 0 150px" }}
        >
          <h2>Support</h2>
          <h3> Welcome to Support of </h3>
          <p>
            Geno<span>V</span>
          </p>
          <Link to="/" className="btn btn-outline-light">
            return Back To home
          </Link>
        </div>
      </div>
    </div>
  );
}
