import React from "react";
import styles from "./UserDetail.module.css";
import { AvatarThanhTuan } from "../../../assets/ExportImages";
import {
  Address,
  Mail,
  Phone,
  Boat,
  HomeAdmin,
  Tuan,
} from "../../../assets/ExportImages";
const UserInFormation = ({ data }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.boxUserInfor}>
        <h3>User information</h3>
        <div
          className={` d-flex justify-content-start align-items-center ${styles.inforUser}`}
        >
          <img src={Tuan} />
          <div>
            <span>{data.name}</span>
            <p>ID: {data.id}</p>
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
                <p> {data.Address}</p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Mail} />
              <div>
                <span>Email</span>
                <p> {data.Email}</p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Phone} />
              <div>
                <span>Telephone</span>
                <p> {data.Telephone}</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={Boat} />
              <div>
                <span>Day of birth</span>
                <p> {data.DayOfBirth}</p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-start align-items-center ${styles.address}`}
            >
              <img src={HomeAdmin} />
              <div>
                <span>Store name</span>
                <p> {data.StoreName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInFormation;
