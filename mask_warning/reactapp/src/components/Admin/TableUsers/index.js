import React from "react";
import styles from "./TableUsers.module.css";
import { Avatar } from "../../../assets/ExportImages";
import homIcon from "../../../assets/icons/home.png";
import {
  AvatarThanhTuan,
  AvatarNgocHieu,
  AvatarTrungHieu,
} from "../../../assets/ExportImages";
import { Link } from "react-router-dom";

const TableUsers = () => {
  return (
    <div>
      <table class={`table ${styles.tableUsers}`}>
        <thead className={styles.theadUser}>
          <tr className={styles.nameCol}>
            <th scope="col">Customer name</th>
            <th scope="col">Store name</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.rowValueUser}>
            <Link to={`/users-manager/user-detail`}>
              <td className={styles.customerName}>
                <div
                  className={styles.avatarUserManager}
                  style={{ backgroundImage: `url('${AvatarTrungHieu}')` }}
                ></div>
                <span className="ml-4">Võ Trung Hiếu</span>
              </td>
            </Link>

            <td>Shop Highway Menswear</td>
            <td>May 26, 2021</td>
            <td>
              <button className={`btn btn-danger ${styles.actionDelete}`}>
                Delete
              </button>
            </td>
          </tr>
          <tr className={styles.rowValueUser}>
            <Link to={`/users-manager/user-detail`}>
              {" "}
              <td className={styles.customerName}>
                <div
                  className={styles.avatarUserManager}
                  style={{ backgroundImage: `url('${AvatarNgocHieu}')` }}
                ></div>
                <span className="ml-4">Steve Rogers</span>
              </td>
            </Link>

            <td>Vintage Violet</td>
            <td>May 24, 2021</td>
            <td>
              <button className={`btn btn-danger ${styles.actionDelete}`}>
                Delete
              </button>
            </td>
          </tr>
          <tr className={styles.rowValueUser}>
            <Link to={`/users-manager/user-detail`}>
              <td className={styles.customerName}>
                <div
                  className={styles.avatarUserManager}
                  style={{ backgroundImage: `url('${AvatarThanhTuan}')` }}
                ></div>
                <span className="ml-4">Huỳnh Đức Thanh Tuấn</span>
              </td>
            </Link>

            <td>Shop Highway Menswear</td>
            <td>May 24, 2021</td>
            <td>
              <button className={`btn btn-danger ${styles.actionDelete}`}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
