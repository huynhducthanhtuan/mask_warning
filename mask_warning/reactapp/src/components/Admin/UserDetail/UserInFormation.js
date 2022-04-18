import React from "react";
import styles from "./UserDetail.module.css";
import { AvatarThanhTuan } from "../../../assets/ExportImages";
const UserInFormation = ({ data }) => {
  return (
    <div className={styles.userInfo}>
      <div className="row">
        <div className="col-6">
          <h3>User information</h3>
          <div>
            <div
              className={styles.avatarUserManager}
              style={{ backgroundImage: `url('${AvatarThanhTuan}')` }}
            ></div>
            <div>
              <span>{data.name}</span>
              <p>ID: {data.id}</p>
            </div>
          </div>
          <div>
            <image src="" />
            <div>
              <span>Address</span>
              <p> {data.Address}</p>
            </div>
          </div>
          <div>
            <image src="" />
            <div>
              <span>Email</span>
              <p> {data.Email}</p>
            </div>
          </div>
          <div>
            <image src="" />
            <div>
              <span>Telephone</span>
              <p> {data.Telephone}</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div>
            <image src="" />
            <div>
              <span>Day of birth</span>
              <p> {data.DayOfBirth}</p>
            </div>
          </div>
          <div>
            <image src="" />
            <div>
              <span>Store name</span>
              <p> {data.StoreName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInFormation;
