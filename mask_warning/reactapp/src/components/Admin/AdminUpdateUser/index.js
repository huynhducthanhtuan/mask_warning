import React, { useState, useRef, useEffect } from "react";
import styles from "./AdminUpdateUser.module.css";
import Frame from "../Frame";
import Address from "../Address/Address";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  validateFullName,
  validateStoreName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
} from "../../../helpers/validator";
import { viewProfile, updateUserAPI } from "../../../apis";

const AdminUpdateUser = () => {
  const { userId } = useParams();
  const [gender, setGender] = useState("");
  const [genderCheckedField, setGenderCheckedField] = useState("");
  const [cities, setCities] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const genderRef = useRef();
  const fullNameRef = useRef();
  const emailRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const wardRef = useRef();
  const districtRef = useRef();
  const cityRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleFillOldDatas = () => {
    if (userInfo) {
      const {
        address,
        ward,
        district,
        hometown,
        fullName,
        storeName,
        email,
        gender,
        phoneNumber,
        userName,
        password,
      } = userInfo;

      fullNameRef.current.value = fullName;
      emailRef.current.value = email;
      addressRef.current.value = address;
      wardRef.current.value = ward;
      districtRef.current.value = district;
      cityRef.current.value = hometown;
      phoneNumberRef.current.value = phoneNumber;
      storeNameRef.current.value = storeName;
      userNameRef.current.value = userName;
      passwordRef.current.value = password;

      setGenderCheckedField(gender);
    }
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const handleValidateFields = () => {
    const isValidFullName = validateFullName(fullNameRef.current.value.trim());
    const isValidEmail = validateEmail(emailRef.current.value.trim());
    const isValidAddress = validateAddress(addressRef.current.value.trim());
    const isValidPhoneNumber = validatePhoneNumber(
      phoneNumberRef.current.value.trim()
    );
    const isValidStoreName = validateStoreName(
      storeNameRef.current.value.trim()
    );

    if (!isValidFullName.isValid) return { error: isValidFullName.error };
    if (!isValidEmail.isValid) return { error: isValidEmail.error };
    if (!isValidStoreName.isValid) return { error: isValidStoreName.error };
    if (!isValidPhoneNumber.isValid) return { error: isValidPhoneNumber.error };
    if (cityRef.current.value === "") return { error: "Please select city" };
    if (districtRef.current.value === "")
      return { error: "Please select district" };
    if (wardRef.current.value === "") return { error: "Please select ward" };
    if (!isValidAddress.isValid) return { error: isValidAddress.error };
    if (gender === "") return { error: "Please select gender" };

    return { message: "success" };
  };

  const handleUpdateUser = async () => {
    const validateResult = handleValidateFields();

    if (validateResult.message === "success") {
      // Gather data
      const updateUser = {
        userId: userId,
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        gender: gender,
        storeName: storeNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        userName: userNameRef.current.value,
        password: passwordRef.current.value,
        hometown: cityRef.current.value,
        district: districtRef.current.value,
        ward: wardRef.current.value,
        address: addressRef.current.value,
      };

      // Call API
      const data = await updateUserAPI(updateUser);
      if (data.status === "success") {
        toast.success("Update user success".toLocaleUpperCase());
      } else {
        toast.error("Update user failed".toLocaleUpperCase());
      }
    } else {
      toast.error(validateResult.error.toLocaleUpperCase());
    }
  };

  useEffect(() => {
    const getCities = async () => {
      const resCities = await fetch(
        "https://provinces.open-api.vn/api/?depth=3"
      );
      const res = await resCities.json();
      setCities(await res);
    };
    getCities();
  }, []);

  useEffect(async () => {
    const handleGetUserInfo = async () => {
      const userInfo = await viewProfile({ userId });
      setUserInfo(userInfo);
    };

    await handleGetUserInfo();

    handleFillOldDatas();
  }, []);

  return (
    <section>
      <Frame>
        <section className={styles.containerCreateAccount}>
          <h2>Update user account</h2>
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

              <Address
                wardRef={wardRef}
                districtRef={districtRef}
                cityRef={cityRef}
                cities={cities}
                defaultValue={{
                  district: (userInfo && userInfo.district) || "",
                  hometown: (userInfo && userInfo.hometown) || "",
                  ward: (userInfo && userInfo.ward) || "",
                }}
              />

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
                  <div
                    className="form-check"
                    onChange={handleChangeGender}
                    ref={genderRef}
                  >
                    <div className={styles.genderItemPart}>
                      <input
                        className={`${styles.formCheckInput}`}
                        type="radio"
                        value="male"
                        name="gender"
                        checked={genderCheckedField === "male"}
                        onChange={(e) => setGenderCheckedField("male")}
                      />{" "}
                      <span>Male</span>
                    </div>
                    <div className={styles.genderItemPart}>
                      <input
                        className={`${styles.formCheckInput}`}
                        type="radio"
                        value="female"
                        name="gender"
                        checked={genderCheckedField === "female"}
                        onChange={(e) => setGenderCheckedField("female")}
                      />{" "}
                      <span>Female</span>
                    </div>
                    <div className={styles.genderItemPart}>
                      <input
                        className={`${styles.formCheckInput}`}
                        type="radio"
                        value="other"
                        name="gender"
                        checked={genderCheckedField === "other"}
                        onChange={(e) => setGenderCheckedField("other")}
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
                <input type="text" disabled={true} ref={passwordRef}></input>
              </li>
            </ul>
          </div>
          <div className={styles.submitButtonPart}>
            <button type="submit" onClick={handleUpdateUser}>
              Update
            </button>
          </div>
        </section>
      </Frame>
    </section>
  );
};

export default AdminUpdateUser;
