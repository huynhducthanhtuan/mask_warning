import React from "react";
import styles from "./UserDetail.module.css";
import {
  Address,
  Mail,
  Phone,
  Boat,
  HomeAdmin,
} from "../../../assets/ExportImages";

const UserInFormation = ({ data }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.boxUserInfor}>
        <h3>User information</h3>
        <div
          className={` d-flex justify-content-start align-items-center ${styles.inforUser}`}
        >
          <img src={data.avatar} style={{ borderRadius: "50%" }} />
          <div>
            <span>{data.fullName}</span>
            <p>ID: {data.userId}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Address} />
              <div>
                <span>Address</span>
                <p>
                  {" "}
                  {data.district}, {data.hometown}
                </p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Mail} />
              <div>
                <span>Email</span>
                <p> {data.email}</p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Phone} />
              <div>
                <span>Telephone</span>
                <p> {data.phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Boat} />
              <div>
                <span>Gender</span>
                <p> {data.gender}</p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={HomeAdmin} />
              <div>
                <span>Store name</span>
                <p> {data.storeName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInFormation;
