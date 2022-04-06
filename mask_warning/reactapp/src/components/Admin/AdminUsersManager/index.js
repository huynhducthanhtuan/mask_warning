import React, { useRef, useState } from "react";
import styles from "./UsersManager.module.css"
import { Link } from "react-router-dom";
import LeftControl from "../AdminLeftControl";

const UsersManagerAdmin = () => {

    return (
        
        <section className={styles.homeMain}>
            <LeftControl toggle="users"/>
            <div>Users</div>
        </section>
    )
}
export default UsersManagerAdmin;