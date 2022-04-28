import React, { useState } from "react";
import styles from "./TableUsers.module.css";
import { Link, useNavigate } from "react-router-dom";

const TableUsers = ({ users, OpenModal, setOpenModal, setUserIdToDelete }) => {
  const navigate = useNavigate();

  return (
    <div>
      <table className={`table ${styles.tableUsers}`}>
        <thead className={styles.theadUser}>
          <tr className={styles.nameCol}>
            <th scope="col">Fullname</th>
            <th scope="col">Store name</th>
            <th scope="col">Created date</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr className={styles.rowValueUser} key={index}>
                <Link to={`/admin/reports-manager/user-detail/${user.userId}`}>
                  <td className={styles.customerName}>
                    <div
                      className={styles.avatarUserManager}
                      style={{ backgroundImage: `url('${user.avatar}')` }}
                    ></div>
                    <span className="ml-4">{user.fullName}</span>
                  </td>
                </Link>

                <td>{user.storeName}</td>
                <td>{user.createdDate.slice(0, 10)}</td>
                <td>
                  <button
                    className={`btn btn-danger ${styles.actionDelete}`}
                    onClick={() => {
                      setOpenModal(!OpenModal);
                      setUserIdToDelete(user.userId);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-primary ${styles.actionEdit}`}
                    onClick={() => {
                      navigate(
                        `/admin/users-manager/update-user/${user.userId}`
                      );
                    }}
                  >
                    Update
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
