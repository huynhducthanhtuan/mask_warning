import React, { useState, useRef } from "react";
import Frame from "../Frame";
import styles from "./AdminCreateUser.module.css";
import Address from "./../../Helper/Province/Address";
import Province from "../Province";

const AdminCreateUser = () => {
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const fullNameRef = useRef();
  const emailRef = useRef();
  const storeNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitForm = () => {
    const data = {
      fullNameRef: fullNameRef.current.value,
      emailRef: emailRef.current.value,
      storeNameRef: storeNameRef.current.value,
      phoneRef: phoneRef.current.value,
      addressRef: addressRef.current.value,
      userNameRef: userNameRef.current.value,
      passwordRef: passwordRef.current.value,
      confirmPasswordRef: confirmPasswordRef.current.value,
      district,
      city,
    };
    console.log(data);
  };

  return (
    <section>
      <Frame>
        <section className={styles.containerCreateAccount}>
          <h2>Account</h2>
          <div className="row">
            <ul className="col-6">
              <li>
                <div className="d-flex">
                  <label>Full name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Full name"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Store name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Enter store name"></input>
              </li>

              <Province setDistrict={setDistrict} setCity={setCity} />

              <li>
                <div className="d-flex">
                  <label>Address</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Enter your address"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Gender</label>
                  <span>*</span>
                </div>
                <div
                  className={`d-flex justify-content-between ${styles.genderCheckbox}`}
                >
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Female</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="col-6">
              <li>
                <div className="d-flex">
                  <label>Email</label>
                  <span>*</span>
                </div>
                <input type="email" placeholder="Enter your email"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Phone</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="+84..."></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>User name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Enter user name"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Password</label>
                  <span>*</span>
                </div>
                <input type="password" placeholder="Enter password"></input>
              </li>
              <li className={styles.confirmPassword}>
                <div className="d-flex">
                  <label>Confirm Password</label>
                  <span>*</span>
                </div>
                <input type="password" placeholder="ReEnter password"></input>
              </li>
              <li>
                <button type="submit" onClick={submitForm}>
                  Submit
                </button>
              </li>
            </ul>
          </div>
        </section>
      </Frame>
    </section>
  );
};

export default AdminCreateUser;
