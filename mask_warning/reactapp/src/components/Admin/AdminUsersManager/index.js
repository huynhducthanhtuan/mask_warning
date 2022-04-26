import React, { useRef, useState, useEffect } from "react";
import styles from "./UsersManager.module.css";
import { Link } from "react-router-dom";
import { Avatar } from "../../../assets/ExportImages";
import { deleteUser, viewUserList } from "../../../apis";
import { toast } from "react-toastify";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import TableUsers from "../TableUsers";
import Loading from "../../Helper/Loading";
import Modal from "./../../Helper/Modal/index";

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
          title="Delete user account "
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

            <Link to="/admin/users-manager/create-user">
              {" "}
              <button
                type="button"
                className={`btn btn-warning mt-4 ${styles.createAccountUser}`}
              >
                Create Account for user
              </button>
            </Link>
            {users ? (
              <TableUsers
                users={users}
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
                setUserIdToDelete={setUserIdToDelete}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersManagerAdmin;
