import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import styles from "./ProfileChangeInformation.module.css";
import Header from "../Header";
import Address from "../Admin/Address/Address";
import { isAuthenticated } from "./../Auth/index";
import { updateProfile, viewProfile } from "../../apis";
import { toast } from "react-toastify";
import Loading from "../Helper/Loading";
import { PersonalInformationImage } from "../../assets/ExportImages";

const ProfileChangeInformation = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [cities, setCities] = useState([]);
  // const { userId } = useParams();
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
  const addressRef = useRef();
  const storeNameRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const districtRef = useRef();
  const cityRef = useRef();
  const wardRef = useRef();

  const { user } = isAuthenticated();

  const navigate = useNavigate();

  const submitUpdateProfile = (e) => {
    e.preventDefault();
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
      userId: user.userId,
    };
    console.log(dataSubmit);
    updateProfile(dataSubmit).then((result) => {
      console.log(result);
      toast.success("Update profile success".toLocaleUpperCase());
      navigate("/profile");
    });
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
    loadViewProfile();
  }, []);

  // console.log(userInfo);
  return (
    <section>
      <Header />
      <div className="container">
        <div className="row">
          <ProfileSidebar userInfo={userInfo} />
          {loadingPage ? (
            <Loading />
          ) : (
            <section className={` col-9 ${styles.boxPersonalInformation}`}>
              <div className={`d-flex ${styles.personalInformation}`}>
                <img src={PersonalInformationImage}></img>
                <span>Personal Information</span>
              </div>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Gender: </label>
                  <select ref={genderRef}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
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
                  <label>Tel: </label>
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
                <Link to="/profile">
                  <button>Cancel</button>
                </Link>
              </div>


            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileChangeInformation;
