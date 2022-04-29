import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOutApi } from "../../../apis";
import Modal from "../../Helper/Modal";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import styles from "./Frame.module.css";


const Frame = ({ children, titleToggle = "home", searchBar = () => { } }) => {
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const handleSignout = async () => {
    const data = await signOutApi();
    console.log(data);
    if (data.message === "Sign out success !!") {
      toast.success(data.message.toLocaleUpperCase());
      navigate("/admin/signin");
      localStorage.removeItem("isAdminLoggedIn");
    }
  };

  return (
    <div className="container">
      <div className="row">
        {openModal && (
          <Modal
            body="Are you sure to sign out ??"
            setOpenModal={setOpenModal}
            action={handleSignout}
          // isCss={true}
          />
        )}
        <LeftControl toggle={titleToggle} />
        <div className="col-10">
          <div className={styles.usersManager}>
            {searchBar()}
            <ShowBox setOpenModal={setOpenModal} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Frame;
