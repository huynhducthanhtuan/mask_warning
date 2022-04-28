import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  createNewUserAPI,
  generateUserNameAPI,
  generatePasswordAPI,
} from "../../../apis";
import {
  validateFullName,
  validateStoreName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
} from "../../../helpers/validator";
import Header from "../../Header";
import Loading from "../../Helper/Loading";
import LeftControl from "../AdminLeftControl";
import AddressCreateUser from "../../Admin/Address/AddressCreateUser";
import styles from "./AdminCreateUser.module.css";

const AdminCreateUser = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const fullNameRef = useRef();
  const emailRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();
  const wardRef = useRef();
  const districtRef = useRef();
  const cityRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleGenerateUserName = async (e) => {
    const data = await generateUserNameAPI({
      fullName: fullNameRef.current.value,
    });

    // auto fill into user name input
    userNameRef.current.value = data.userName;
  };

  const handleGeneratePassword = async () => {
    const data = await generatePasswordAPI();

    // auto fill into password input
    if (data && data.password) {
      passwordRef.current.value = data.password;
    }
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
    if (cityRef.current.value === "") return { error: "Please select city" };
    if (districtRef.current.value === "")
      return { error: "Please select district" };
    if (wardRef.current.value === "") return { error: "Please select ward" };
    if (!isValidAddress.isValid) return { error: isValidAddress.error };
    if (genderRef.current.value === "")
      return { error: "Please select gender" };
    if (!isValidPhoneNumber.isValid) return { error: isValidPhoneNumber.error };

    return { message: "success" };
  };

  const submitCreateUser = async (e) => {
    e.preventDefault();
    const validateResult = handleValidateFields();

    if (validateResult.message === "success") {
      const dataSubmit = {
        fullName: fullNameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        storeName: storeNameRef.current.value.trim(),
        phoneNumber: phoneNumberRef.current.value.trim(),
        gender: genderRef.current.value.trim(),
        hometown: cityRef.current.value.trim(),
        district: districtRef.current.value.trim(),
        ward: wardRef.current.value.trim(),
        address: addressRef.current.value.trim(),
        userName: userNameRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
      };

      const data = await createNewUserAPI(dataSubmit);
      switch (data.message) {
        case "Email is already exists":
          toast.error("Email is already exists".toLocaleUpperCase());
          break;
        case "Username is already exists":
          toast.error("Username is already exists".toLocaleUpperCase());
          break;
        case "failed":
          toast.success("Create new user failed".toLocaleUpperCase());
          break;
        case "success":
          toast.success("Create new user success".toLocaleUpperCase());
          break;
      }
    } else {
      toast.error(validateResult.error.toLocaleUpperCase());
    }
  };

  const cancelCreateUser = () => {
    navigate(-1);
  };

  useEffect(async () => {
    const getCities = async () => {
      const resCities = await fetch(
        "https://provinces.open-api.vn/api/?depth=3"
      );
      const res = await resCities.json();
      setCities(res);
      setLoadingPage(false);
    };

    await getCities();
    await handleGeneratePassword();
  }, []);

  return (
    <section>
      <Header />
      <div className="d-flex">
        <LeftControl toggle="users" />
        {loadingPage ? (
          <Loading />
        ) : (
          <section className={` col-9 ${styles.boxPersonalInformation}`}>
            <div className={`d-flex ${styles.personalInformation}`}>
              <span>Create new user account</span>
            </div>
            <ul className={styles.boxInformation}>
              <li className={`d-flex ${styles.item}`}>
                <label>Fullname </label>
                <input
                  name="text"
                  ref={fullNameRef}
                  required
                  onBlur={handleGenerateUserName}
                />
              </li>

              <li className={`d-flex ${styles.item}`}>
                <label>Email </label>
                <input name="email" ref={emailRef} required />
              </li>
            </ul>

            <form>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Gender</label>
                  <select ref={genderRef}>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Other"}>Other</option>
                  </select>
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Store name </label>
                  <input name="text" ref={storeNameRef} required />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>

              <ul className={styles.boxInformation}>
                {cities !== [] && (
                  <AddressCreateUser
                    wardRef={wardRef}
                    districtRef={districtRef}
                    cityRef={cityRef}
                    cities={cities}
                    defaultValue={{
                      ward: "",
                      district: "",
                      hometown: "",
                    }}
                  />
                )}
                <li className={`d-flex ${styles.item}`}>
                  <label>Address </label>
                  <input name="text" ref={addressRef} required />
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Phone number </label>
                  <input name="text" ref={phoneNumberRef} required />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Username </label>
                  <input name="text" ref={userNameRef} required />
                  <p className={styles.warning}>*</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <label>Password </label>
                  <input name="text" ref={passwordRef} required />
                  <p className={styles.warning}>*</p>
                </li>
              </ul>
              <div
                className={` d-flex justify-content-center ${styles.btnChangePassword}`}
              >
                <button onClick={submitCreateUser}>Create</button>
                <button onClick={cancelCreateUser} className={styles.btnCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </section>
  );
};

export default AdminCreateUser;
