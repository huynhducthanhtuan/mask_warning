import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import styles from "./ProfileChangeInformation.module.css";
import Header from "../Header";
import Address from "../Admin/Address/Address";
import { isAuthenticated } from "./../Auth/index";
import { updateProfile, viewProfile } from "../../apis";
import { toast } from "react-toastify";
import {
  validateFullName,
  validateStoreName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
} from "../../helpers/validator";
import Loading from "../Helper/Loading";
import { PersonalInformationImage } from "../../assets/ExportImages";

const ProfileChangeInformation = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [cities, setCities] = useState([]);
  const { user } = isAuthenticated();
  const navigate = useNavigate();

  const fullNameRef = useRef();
  const emailRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();
  const wardRef = useRef();
  const addressRef = useRef();

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
    if (genderRef.current.value === "")
      return { error: "Please select gender" };

    return { message: "success" };
  };

  const submitUpdateProfile = async (e) => {
    e.preventDefault();
    const validateResult = handleValidateFields();

    if (validateResult.message === "success") {
      const dataSubmit = {
        fullName: fullNameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        address: addressRef.current.value.trim(),
        storeName: storeNameRef.current.value.trim(),
        phoneNumber: phoneNumberRef.current.value.trim(),
        gender: genderRef.current.value.trim(),
        hometown: cityRef.current.value
          ? cityRef.current.value.trim()
          : userInfo.hometown,
        district: districtRef.current.value
          ? districtRef.current.value.trim()
          : userInfo.district,
        ward: wardRef.current.value
          ? wardRef.current.value.trim()
          : userInfo.ward,
        userId: user.userId,
      };

      const data = await updateProfile(dataSubmit);
      switch (data.message) {
        case "Email is already exists":
          toast.error("Email is already exists".toLocaleUpperCase());
          break;
        case "failed":
          toast.success("Update profile failed".toLocaleUpperCase());
          break;
        case "success":
          toast.success("Update profile success".toLocaleUpperCase());
          navigate("/profile");
          break;
      }
    } else {
      toast.error(validateResult.error.toLocaleUpperCase());
    }
  };
  // console.log(cityRef.current.value);
  const loadViewProfile = async () => {
    const data = await viewProfile({ userId: user.userId });
    if (data.error === "User not found") {
      toast.error("User not found !!!".toLocaleUpperCase());
    } else {
      setUserInfo(data);
      setLoadingPage(false);
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

  useEffect(() => {
    loadViewProfile();
  }, []);

  return (
    <section>
      <Header />
      <div className="d-flex">
        <ProfileSidebar userInfo={userInfo} />
        {loadingPage ? (
          <Loading />
        ) : (
          <section className={` col-9 ${styles.boxPersonalInformation}`}>
            <div className={`d-flex ${styles.personalInformation}`}>
              <img src={PersonalInformationImage}></img>
              <span>Personal Information</span>
            </div>
            <div className={styles.fillText}>
              <span>Personal information</span>
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
                  <label>Gender: </label>
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
                  <label>Store name: </label>
                  <input
                    name="text"
                    ref={storeNameRef}
                    required
                    defaultValue={userInfo.storeName}
                  />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <div className={styles.fillText}>
                <span>
                  Please fill in all the fields marked with a red * below
                </span>
              </div>
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
                  <label>Address: </label>
                  <input
                    name="text"
                    ref={addressRef}
                    required
                    defaultValue={userInfo.address}
                  />
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Phone number: </label>
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
                <button
                  onClick={submitUpdateProfile}
                  className={`btn btn-info`}
                >
                  Update
                </button>
                <Link to="/profile">
                  <button className={` btn btn-primary`}>Cancel</button>
                </Link>
              </div>

            </form>
          </section>
        )}
      </div>

    </section>
  );
};

export default ProfileChangeInformation;
