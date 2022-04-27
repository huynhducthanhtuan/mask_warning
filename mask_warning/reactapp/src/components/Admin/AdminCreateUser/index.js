import React, { useState, useRef, useEffect } from "react";
import styles from "./AdminCreateUser.module.css";
import Frame from "../Frame";
import Address from "../Address/Address";
import { toast } from "react-toastify";
import {
  validateFullName,
  validateStoreName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
} from "../../../helpers/validator";
import {
  createNewUserAPI,
  generateUserNameAPI,
  generatePasswordAPI,
} from "../../../apis";

const AdminCreateUser = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [gender, setGender] = useState("");
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

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const handleGeneratePassword = async () => {
    const data = await generatePasswordAPI();

    // auto fill into password input
    passwordRef.current.value = data.password;
  };

  const handleGenerateUserName = async (e) => {
    const data = await generateUserNameAPI({
      fullName: fullNameRef.current.value,
    });

    // auto fill into user name input
    userNameRef.current.value = data.userName;
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
    if (city === "") return { error: "Please select city" };
    if (district === "") return { error: "Please select district" };
    if (ward === "") return { error: "Please select ward" };
    if (!isValidAddress.isValid) return { error: isValidAddress.error };
    if (gender === "") return { error: "Please select gender" };

    return { message: "success" };
  };

  const handleCreateUser = async () => {
    const validateResult = handleValidateFields();

    if (validateResult.message === "success") {
      // Gather data
      const newUser = {
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        gender: gender,
        storeName: storeNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        userName: userNameRef.current.value,
        password: passwordRef.current.value,
        hometown: city,
        district: district,
        ward: ward,
        address: addressRef.current.value,
      };

      // Call API
      const data = await createNewUserAPI(newUser);
      if (data.status === "success") {
        toast.success("Create new user success".toLocaleUpperCase());
      } else {
        toast.error("Create new user failed".toLocaleUpperCase());
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
    await handleGeneratePassword();
  }, []);

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
                  onBlur={handleGenerateUserName}
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

              {cities != [] && (
                <Address
                  wardRef={wardRef}
                  districtRef={districtRef}
                  cityRef={cityRef}
                  cities={cities}
                  defaultValue={{
                    district: "",
                    hometown: "",
                    ward: "",
                  }}
                />
              )}

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
                <input type="text" disabled={true} ref={passwordRef}></input>
              </li>
            </ul>
          </div>
          <div className={styles.submitButtonPart}>
            <button type="submit" onClick={handleCreateUser}>
              Submit
            </button>
          </div>
        </section>
      </Frame>
    </section>
  );
};

export default AdminCreateUser;
