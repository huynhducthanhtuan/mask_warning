import React from "react";
import Frame from "../Frame";
import styles from "./AdminCreateUser.module.css";
const AdminCreateUser = () => {
  return (
    <section>
      <Frame>
        <section className={styles.containerCreateAccount}>
          <h2>Account</h2>
          <div className="row">
            <ul className="col-6">
              <li>
                <div className="d-flex">
                  <label>First name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="First Name"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Store name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Enter store name"></input>
              </li>
              <li>
                <div className={`d-flex ${styles.boxContent}`}>
                  <label>City</label>
                  <span>*</span>
                </div>
                <select className={styles.slectOption}>
                  <option>Hue</option>
                  <option>Da Nang</option>
                </select>
              </li>
              <li>
                <div className={`d-flex ${styles.boxContent}`}>
                  <label>Distric</label>
                  <span>*</span>
                </div>
                <select className={styles.slectOption}>
                  <option>Hai Chau</option>
                  <option>Son tra</option>
                </select>
              </li>
              <li>
                <div className="d-flex">
                  <label>Address</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Enter your address"></input>
              </li>
            </ul>
            <ul className="col-6">
              <li>
                <div className="d-flex">
                  <label>Last name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Last name"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Phone</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="+84..."></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>User name</label>
                  <span>*</span>
                </div>
                <input type="text" placeholder="Enter user name"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Password</label>
                  <span>*</span>
                </div>
                <input type="password" placeholder="Enter password"></input>
              </li>
              <li>
                <div className="d-flex">
                  <label>Confirm Password</label>
                  <span>*</span>
                </div>
                <input type="password" placeholder="ReEnter password"></input>
              </li>
            </ul>
            <button type="submit">Submit</button>
          </div>
        </section>
      </Frame>
    </section>
  );
};

export default AdminCreateUser;
