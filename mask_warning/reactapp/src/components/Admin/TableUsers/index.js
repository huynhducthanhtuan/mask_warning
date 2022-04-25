import React, { useState } from "react";
import styles from "./TableUsers.module.css";
import { Avatar } from "../../../assets/ExportImages";
import homIcon from "../../../assets/icons/home.png";
import {
  AvatarThanhTuan,
  AvatarNgocHieu,
  AvatarTrungHieu,
} from "../../../assets/ExportImages";
import { Link } from "react-router-dom";

const TableUsers = ({ users, OpenModal, setOpenModal, setUserIdToDelete }) => {
  console.log(users);
  return (
    <div>
      <table className={`table ${styles.tableUsers}`}>
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
            // console.log(user.createdDate);
            return (
              <tr className={styles.rowValueUser} key={user.userId}>
                <Link to={`/admin/users-manager/user-detail/${user.userId}`}>
                  <td className={styles.customerName}>
                    <div
                      className={styles.avatarUserManager}
                      style={{ backgroundImage: `url('${user.avatar}')` }}
                    ></div>
                    <span className="ml-4">{user.fullName}</span>
                  </td>
                </Link>

                <td>{user.storeName}</td>
                {/* <td>{user.createdDate.split("T")[0]}</td> */}
                <td>
                  <button
                    className={`btn btn-danger ${styles.actionDelete}`}
                    onClick={() => {
                      setOpenModal(!OpenModal);

                      // setId user for Delete
                      setUserIdToDelete(user.userId);
                    }}
                  >
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
