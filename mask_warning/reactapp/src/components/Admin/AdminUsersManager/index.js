import React, { useRef, useState } from "react";
import styles from "./UsersManager.module.css";
import { Link } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import TableUsers from "../TableUsers";
import { Avatar } from "../../../assets/ExportImages";

const UsersManagerAdmin = () => {
  return (
    <div className="container">
      <div className="row">
        <LeftControl toggle="users" />
        <div className="col-10">
          <div className={styles.usersManager}>
            <div className="d-lex mb-4">
              <div class={styles.box}>
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" name="" />
              </div>
              <ShowBox />
            </div>

            <button
              type="button"
              class={`btn btn-warning mt-4 ${styles.createAccountUser}`}
            >
              Create Account for user
            </button>
            <TableUsers />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersManagerAdmin;
