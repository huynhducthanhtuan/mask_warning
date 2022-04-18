import React, { useRef, useState, useEffect } from "react";
import styles from "./UsersManager.module.css";
import { Link } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import TableUsers from "../TableUsers";
import { Avatar } from "../../../assets/ExportImages";
import { viewUserList } from "../../../apis";
import Loading from "../../Helper/Loading";

const UsersManagerAdmin = () => {
  const [users, setUsers] = useState();

  const loadUsersManage = async () => {
    await viewUserList().then((data) => {
      setUsers(data.result);
    });
  };
  useEffect(() => {
    loadUsersManage();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <LeftControl toggle="users" />
        <div className="col-10">
          <div className={styles.usersManager}>
            <div className="d-lex mb-4">
              <div className={styles.box}>
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" name="" />
              </div>
              <ShowBox />
            </div>

            <button
              type="button"
              className={`btn btn-warning mt-4 ${styles.createAccountUser}`}
            >
              Create Account for user
            </button>
            {users ? <TableUsers users={users} /> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersManagerAdmin;
