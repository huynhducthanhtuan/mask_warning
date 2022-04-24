import React, { useRef, useState, useEffect } from "react";
import styles from "./UsersManager.module.css";
import { Link } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import TableUsers from "../TableUsers";
import { Avatar } from "../../../assets/ExportImages";
import { deleteUser, searchUsers, viewUserList } from "../../../apis";
import Loading from "../../Helper/Loading";
import Modal from "./../../Helper/Modal/index";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
const UsersManagerAdmin = () => {
  const querySearchRef = useRef();
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

  const loadUsersSearched = async () => {
    const data = await searchUsers({
      pageSize: 3,
      pageIndex: 1,
      query: querySearchRef.current.value,
    });
    console.log("data searched", data.usersList);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    loadUsersSearched();
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
          <div
            className={styles.usersManager}
            style={
              !users
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#f0f7fd" }
            }
          >
            <div className="d-lex mb-4">
              <form onSubmit={(e) => submitSearch(e)}>
                <div className={styles.box}>
                  <i
                    className="fa fa-search"
                    aria-hidden="true"
                    onClick={submitSearch}
                  ></i>
                  <input type="text" name="" ref={querySearchRef} />
                </div>
              </form>

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
