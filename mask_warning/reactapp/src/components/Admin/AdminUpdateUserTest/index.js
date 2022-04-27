import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfile, viewProfile } from "../../../apis";
import {
  validateFullName,
  validateStoreName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
} from "../../../helpers/validator";
import Header from "../../Header";
import Loading from "../../Helper/Loading";
import Address from "../../Admin/Address/Address";
import LeftControl from "../AdminLeftControl";
import styles from "./AdminUpdateUserTest.module.css";

const AdminUpdateUserTest = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  const addressRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const districtRef = useRef();
  const cityRef = useRef();
  const wardRef = useRef();

  const handleValidateFields = () => {
    // const isValidFullName = validateFullName(fullNameRef.current.value.trim());
    // const isValidEmail = validateEmail(emailRef.current.value.trim());
    const isValidAddress = validateAddress(addressRef.current.value.trim());
    const isValidPhoneNumber = validatePhoneNumber(
      phoneNumberRef.current.value.trim()
    );
    const isValidStoreName = validateStoreName(
      storeNameRef.current.value.trim()
    );

    // if (!isValidFullName.isValid) return { error: isValidFullName.error };
    // if (!isValidEmail.isValid) return { error: isValidEmail.error };
    if (!isValidStoreName.isValid) return { error: isValidStoreName.error };
    if (!isValidPhoneNumber.isValid) return { error: isValidPhoneNumber.error };
    if (cityRef.current.value === "") return { error: "Please select city" };
    if (districtRef.current.value === "")
      return { error: "Please select district" };
    if (wardRef.current.value === "") return { error: "Please select ward" };
    if (!isValidAddress.isValid) return { error: isValidAddress.error };
    if (genderRef.current.value === "")
      return { error: "Please select gender" };

    return { message: "success" };
  };

  const submitUpdateProfile = (e) => {
    e.preventDefault();
    const validateResult = handleValidateFields();

    if (validateResult.message === "success") {
      const dataSubmit = {
        address: addressRef.current.value,
        storeName: storeNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        gender: genderRef.current.value,
        hometown: cityRef.current.value
          ? cityRef.current.value
          : userInfo.hometown,
        district: districtRef.current.value
          ? districtRef.current.value
          : userInfo.district,
        ward: wardRef.current.value ? wardRef.current.value : userInfo.ward,
        userId: userId,
      };

      updateProfile(dataSubmit).then((result) => {
        toast.success("Update profile success".toLocaleUpperCase());
      });
    } else {
      toast.error(validateResult.error.toLocaleUpperCase());
    }
  };

  const cancelUpdateProfile = () => {
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
    <section>
      <Header />
      <div className="d-flex">
        <LeftControl toggle="reports" />
        {loadingPage ? (
          <Loading />
        ) : (
          <section className={` col-9 ${styles.boxPersonalInformation}`}>
            <div className={`d-flex ${styles.personalInformation}`}>
              <span>Update user account</span>
            </div>
            <ul className={styles.boxInformation}>
              <li className={`d-flex ${styles.item}`}>
                <label>Fullname </label>
                <p>{userInfo.fullName}</p>
              </li>

              <li className={`d-flex ${styles.item}`}>
                <label>Email </label>
                <p>{userInfo.email}</p>
              </li>
            </ul>

            <form>
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
              <div
                className={` d-flex justify-content-center ${styles.btnChangePassword}`}
              >
                <button onClick={submitUpdateProfile}>Update</button>
                <button onClick={cancelUpdateProfile}>Cancel</button>
              </div>
            </form>
          </section>
        )}
      </div>
    </section>
  );
};

export default AdminUpdateUserTest;
