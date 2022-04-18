import React from "react";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import styles from "./Frame.module.css";
const Frame = ({ children }) => {
  return (
    <div className="container">
      <div className="row">
        <LeftControl toggle="users" />
        <div className="col-10">
          <div className={styles.usersManager}>
            <ShowBox />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Frame;
