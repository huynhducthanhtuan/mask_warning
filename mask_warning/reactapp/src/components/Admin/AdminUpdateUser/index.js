/* eslint-disable default-case */
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserAPI, viewProfile } from "../../../apis";
import {
  validateFullName,
  validateStoreName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
  validatePassword,
} from "../../../helpers/validator";

import Loading from "../../Helper/Loading";
import Address from "../../Admin/Address/Address";
import styles from "./AdminUpdateUser.module.css";
import UserAvatarFrame from "../UserAvatarFrame";
import Frame from "../Frame";

const AdminUpdateUserTest = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [cities, setCities] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fullNameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const districtRef = useRef();
  const cityRef = useRef();
  const wardRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleValidateFields = () => {
    const isValidFullName = validateFullName(fullNameRef.current.value.trim());
    const isValidEmail = validateEmail(emailRef.current.value.trim());
    const isValidPassword = validatePassword(passwordRef.current.value.trim());
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
    if (cityRef.current.value === "") return { error: "Please select city" };
    if (districtRef.current.value === "")
      return { error: "Please select district" };
    if (wardRef.current.value === "") return { error: "Please select ward" };
    if (!isValidAddress.isValid) return { error: isValidAddress.error };
    if (genderRef.current.value === "")
      return { error: "Please select gender" };
    if (!isValidPhoneNumber.isValid) return { error: isValidPhoneNumber.error };
    if (!isValidPassword.isValid) return { error: isValidPassword.error };

    return { message: "success" };
  };

  const submitUpdateUser = async (e) => {
    e.preventDefault();
    const validateResult = handleValidateFields();

    if (validateResult.message === "success") {
      const updateUser = {
        fullName: fullNameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        storeName: storeNameRef.current.value.trim(),
        phoneNumber: phoneNumberRef.current.value.trim(),
        gender: genderRef.current.value.trim(),
        address: addressRef.current.value.trim(),
        hometown: cityRef.current.value
          ? cityRef.current.value.trim()
          : userInfo.hometown,
        district: districtRef.current.value
          ? districtRef.current.value.trim()
          : userInfo.district,
        ward: wardRef.current.value
          ? wardRef.current.value.trim()
          : userInfo.ward,
        userName: userNameRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
        userId: userId,
      };

      const data = await updateUserAPI(updateUser);
      switch (data.message) {
        case "Email is already exists":
          toast.error("Email is already exists".toLocaleUpperCase());
          break;
        case "Username is already exists":
          toast.error("Username is already exists".toLocaleUpperCase());
          break;
        case "failed":
          toast.success("Update user account failed".toLocaleUpperCase());
          break;
        case "success":
          toast.success("Update user account success".toLocaleUpperCase());
          navigate(`/admin/users-manager/user-detail/${userId}`);
          break;
      }

    } else {
      toast.error(validateResult.error.toLocaleUpperCase());
    }
  };

  const cancelUpdateUser = (e) => {
    e.preventDefault()
    navigate(-1);
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

  useEffect(() => {
    const loadViewProfile = async () => {
      const data = await viewProfile({ userId });
      if (data.error === "User not found") {
        toast.error("User not found !!!".toLocaleUpperCase());
      } else {
        setUserInfo(data);
        setLoadingPage(false);
      }
    };

    loadViewProfile();
  }, []);

  return (
    <Frame>
      <div className="d-flex">
        {userInfo && (
          <UserAvatarFrame userInfo={userInfo} enableChangeAvatar={true} />
        )}
        {loadingPage ? (
          <Loading />
        ) : (
          <section className={` col-9 ${styles.boxPersonalInformation}`}>
            <div className={`d-flex ${styles.personalInformation}`}>
              <span>Update user account</span>
            </div>
            <form>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Fullname </label>
                  <input
                    name="text"
                    ref={fullNameRef}
                    required
                    defaultValue={userInfo.fullName}
                  />
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Email </label>
                  <input
                    name="email"
                    ref={emailRef}
                    required
                    defaultValue={userInfo.email}
                  />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Gender</label>
                  <select ref={genderRef}>
                    {["Male", "Female", "Other"].map((gender, index) => {
                      if (gender === userInfo.gender) {
                        return (
                          <option key={index} value={gender} selected>
                            {gender}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={gender}>
                            {gender}
                          </option>
                        );
                      }
                    })}
                  </select>
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Store name </label>
                  <input
                    name="text"
                    ref={storeNameRef}
                    required
                    defaultValue={userInfo.storeName}
                  />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <ul className={styles.boxInformation}>
                {userInfo && (
                  <Address
                    wardRef={wardRef}
                    districtRef={districtRef}
                    cityRef={cityRef}
                    cities={cities}
                    defaultValue={{
                      district: userInfo.district,
                      hometown: userInfo.hometown,
                      ward: userInfo.ward,
                    }}
                  />
                )}
                <li className={`d-flex ${styles.item}`}>
                  <label>Address </label>
                  <input
                    name="text"
                    ref={addressRef}
                    required
                    defaultValue={userInfo.address}
                  />
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Phone number </label>
                  <input
                    name="text"
                    ref={phoneNumberRef}
                    required
                    defaultValue={userInfo.phoneNumber}
                  />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Username </label>
                  <input
                    name="text"
                    ref={userNameRef}
                    required
                    defaultValue={userInfo.userName}
                  />
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Password </label>
                  <input
                    name="text"
                    ref={passwordRef}
                    required
                    defaultValue={userInfo.password}
                  />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <div
                className={` d-flex justify-content-center ${styles.btnParts}`}
              >
                <button onClick={submitUpdateUser} className="btn btn-primary">Update</button>
                <button onClick={cancelUpdateUser} className="btn btn-info">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </Frame>
  );
};

export default AdminUpdateUserTest;
