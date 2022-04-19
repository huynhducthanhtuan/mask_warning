import React, { useRef, useState, useEffect } from "react";
import styles from "./UsersManager.module.css";
import { Link } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import TableUsers from "../TableUsers";
import { Avatar } from "../../../assets/ExportImages";
import { deleteUser, viewUserList } from "../../../apis";
import Loading from "../../Helper/Loading";
import Modal from "./../../Helper/Modal/index";
import { toast } from "react-toastify";
const UsersManagerAdmin = () => {
  const [users, setUsers] = useState();
  const [OpenModal, setOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState();

  const loadUsersManage = async () => {
    await viewUserList().then((data) => {
      setUsers(data.result);
    });
  };

  useEffect(() => {
    loadUsersManage();
  }, []);

  const handleDeleteUser = (userIdToDelete) => {
    deleteUser({ userId: userIdToDelete }).then((result) => {
      toast.info(result.status);
      loadUsersManage();
    });
  };

  return (
    <div className="container">
      {OpenModal && userIdToDelete && (
        <Modal
          setOpenModal={setOpenModal}
          title="DELETE USER "
          body="Are you sure you want to delete this user?"
          action={handleDeleteUser}
          userDeleteId={userIdToDelete}
        />
      )}
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
            {users ? (
              <TableUsers
                users={users}
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
                setUserIdToDelete={setUserIdToDelete}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersManagerAdmin;
