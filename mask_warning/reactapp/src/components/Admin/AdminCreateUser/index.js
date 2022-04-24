import React, { useState, useRef } from "react";
import Frame from "../Frame";
import styles from "./AdminCreateUser.module.css";
import Address from "./../../Helper/Province/Address";
import Province from "../Province";

const AdminCreateUser = () => {
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const fullNameRef = useRef();
  const emailRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const submitForm = () => {
    const data = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      gender: gender,
      storeName: storeNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      address: addressRef.current.value,
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
      district,
      city,
    };
    console.log(data);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <section>
      <Frame>
        <section className={styles.containerCreateAccount}>
          <h2>Create new user account</h2>
          <div className="row">
            <ul className="col-6">
              <li>
                <div className="d-flex">
                  <label>Full name</label>
                  <span>*</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter full name"
                  ref={fullNameRef}
                ></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Store name</label>
                  <span>*</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter store name"
                  ref={storeNameRef}
                ></input>
              </li>

              <Province setDistrict={setDistrict} setCity={setCity} />

              <li>
                <div className="d-flex">
                  <label>Address</label>
                  <span>*</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter address"
                  ref={addressRef}
                ></input>
              </li>
            </ul>
            <ul className="col-6">
              <li>
                <div className="d-flex">
                  <label>Email</label>
                  <span>*</span>
                </div>
                <input
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                ></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Phone number</label>
                  <span>*</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  ref={phoneNumberRef}
                ></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Gender</label>
                  <span>*</span>
                </div>
                <div
                  className={`d-flex justify-content-between ${styles.genderCheckbox}`}
                >
                  <div className="form-check" onChange={handleChangeGender}>
                    <div className={styles.genderItemPart}>
                      <input
                        className={`${styles.formCheckInput}`}
                        type="radio"
                        value="male"
                        name="gender"
                      />{" "}
                      <span>Male</span>
                    </div>
                    <div className={styles.genderItemPart}>
                      <input
                        className={`${styles.formCheckInput}`}
                        type="radio"
                        value="female"
                        name="gender"
                      />{" "}
                      <span>Female</span>
                    </div>
                    <div className={styles.genderItemPart}>
                      <input
                        className={`${styles.formCheckInput}`}
                        type="radio"
                        value="other"
                        name="gender"
                      />{" "}
                      <span>Other</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <label>User name</label>
                  <span>*</span>
                </div>
                <input type="text" disabled={true} ref={userNameRef}></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Password</label>
                  <span>*</span>
                </div>
                <input
                  type="password"
                  disabled={true}
                  ref={passwordRef}
                ></input>
              </li>
            </ul>
          </div>
          <div className={styles.submitButtonPart}>
            <button type="submit" onClick={submitForm}>
              Submit
            </button>
          </div>
        </section>
      </Frame>
    </section>
  );
};

export default AdminCreateUser;
