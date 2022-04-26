import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import styles from "./ProfileChangeInformation.module.css";
import Header from "../Header";
import Address from "../Helper/Province/Address";
import { isAuthenticated } from "./../Auth/index";
import { updateProfile, viewProfile } from "../../apis";
import { toast } from "react-toastify";
import Loading from "../Helper/Loading";

const ProfileChangeInformation = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const [data, setData] = useState({
    address: "",
    storeName: "",
    phoneNumber: "",
    gender: "Male",
  });

  const { user } = isAuthenticated();

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const submitUpdateProfile = (e) => {
    e.preventDefault();
    const dataSubmit = {
      ...data,
      hometown: city,
      district,
      userId: user.userId,
    };
    updateProfile(dataSubmit).then((result) => {
      console.log(result);
      toast.success(result.status);
      navigate("/profile");
    });
  };

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
                <img src="./icons/personalInformationImage.png"></img>
                <span>Personal Information</span>
              </div>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <label>Name: </label>
                  <p>{userInfo.fullName}</p>
                </li>

                <li className={`d-flex ${styles.item}`}>
                  <label>Email: </label>
                  <p>{userInfo.email}</p>
                </li>
              </ul>
              <div className={styles.fillText}>
                <span>
                  Please fill in all the fields marked with a red * below
                </span>
              </div>
              <div className={styles.fillText}>
                <span>Personal information</span>
              </div>

              <form>
                <ul className={styles.boxInformation}>
                  <li className={`d-flex ${styles.item}`}>
                    <label>Gender: </label>
                    <select onChange={handleChange("gender")}>
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
                      onChange={handleChange("storeName")}
                      required
                    />
                    <p className={styles.warning}>*</p>
                  </li>
                </ul>
                <div className={styles.fillText}>
                  <span>Contract Information</span>
                </div>
                <ul className={styles.boxInformation}>
                  <Address setDistrict={setDistrict} setCity={setCity} />
                  <li className={`d-flex ${styles.item}`}>
                    <label>Address: </label>
                    <input
                      name="text"
                      onChange={handleChange("address")}
                      required
                    />
                    <p className={styles.warning}>*</p>
                  </li>
                  <li className={`d-flex ${styles.item}`}>
                    <label>Tel: </label>
                    <input
                      name="text"
                      onChange={handleChange("phoneNumber")}
                      required
                    />
                    <p className={styles.warning}>*</p>
                  </li>
                </ul>
                <div
                  className={` col-8 d-flex justify-content-center ${styles.btnChangePassword}`}
                >
                  <button onClick={submitUpdateProfile}>Update</button>
                  <Link to="/profile">
                    <button>Cancel</button>
                  </Link>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileChangeInformation;
