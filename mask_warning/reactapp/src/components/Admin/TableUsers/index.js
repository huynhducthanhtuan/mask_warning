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

const TableUsers = ({ users }) => {
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
          {users.map((user, index) => {
            return (
              <tr className={styles.rowValueUser} key={user.userId}>
                <Link to={`/users-manager/user-detail`}>
                  <td className={styles.customerName}>
                    <div
                      className={styles.avatarUserManager}
                      style={{ backgroundImage: `url('${user.avatar}')` }}
                    ></div>
                    <span className="ml-4">{user.fullName}</span>
                  </td>
                </Link>

                <td>{user.storeName}</td>
                <td>{user.createdDate.split("T")[0]}</td>
                <td>
                  <button className={`btn btn-danger ${styles.actionDelete}`}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
