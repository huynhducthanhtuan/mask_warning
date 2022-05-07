import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import StatisticCard from "../AdminStatisticCard";
import styles from "./Home.module.css";

import Loading from "../../Helper/Loading";
import { ellipse, averageHours, newUsersIcon } from "../../../assets/ExportImages";
import ChartAdmin from "../ChartAdmin";
import { countNewUsers, signOutApi } from "../../../apis";
import Frame from "../Frame";

function countUsers(users) {
  var sum = 0;
  for (const key in users) {
    sum += users[key]
  }
  return sum;
}



const HomeAdmin = () => {
  // const newUser = [null, null, null];
  // const [toggle, setToggle] = useState("home");
  const [newUsers, setNewUsers] = useState();
  const [statisticToggle, setStatisticToggle] = useState("w");


  const [calNewUsers, setCalNewUsers] = useState({
    w: 0,
    m: 0,
    y: 0
  });
  const [chartNewUsers, setChartNewUsers] = useState();
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

  const navigate = useNavigate();

  const loadDataNewUsers = async () => {
    const res = await countNewUsers()
    setNewUsers(res.countNewUser)
    setChartNewUsers(res.countNewUser.newUserDaily)
  };
  // if (newUsers) {
  //   // console.log(newUsers);
  // }
  useEffect(() => {
    loadDataNewUsers();
  }, []);

  useEffect(() => {
    if (newUsers) {
      setCalNewUsers({
        w: countUsers(newUsers.newUserDaily),
        m: countUsers(newUsers.newUserWeekly),
        y: countUsers(newUsers.newUserMonthly)
      })
    }
  }, [newUsers])


  const renderHome = () => {
    if (isAdminLoggedIn) {
      return (
        <Frame >
          <div>
            <div className={styles.homeStatisticButtonGroup}>
              <div
                className={
                  statisticToggle === "w"
                    ? `${styles.homeStatisticButton} ${styles.active}`
                    : styles.homeStatisticButton
                }
                onClick={() => {
                  setStatisticToggle("w")
                  setChartNewUsers(newUsers.newUserDaily)
                }}
              >
                <img src={ellipse} />
                <p>Week</p>
              </div>
              <div
                className={
                  statisticToggle === "m"
                    ? `${styles.homeStatisticButton} ${styles.active}`
                    : styles.homeStatisticButton
                }
                onClick={() => {
                  setStatisticToggle("m")
                  setChartNewUsers(newUsers.newUserWeekly)
                }}
              >
                <img src={ellipse} />
                <p>Month</p>
              </div>
              <div
                className={
                  statisticToggle === "y"
                    ? `${styles.homeStatisticButton} ${styles.active}`
                    : styles.homeStatisticButton
                }
                onClick={() => {
                  setStatisticToggle("y")
                  setChartNewUsers(newUsers.newUserMonthly)
                }}
              >
                <img src={ellipse} />
                <p>Year</p>
              </div>
            </div>
            <div className={styles.homeStatisticCards}>
              <StatisticCard
                cardName={"User(s)"}
                data={calNewUsers[statisticToggle]}
                dataType={" new user(s)"}
                iconLink={newUsersIcon}
              />
            </div>
          </div >
          <div className="container-fluid">
            <ChartAdmin newUsers={chartNewUsers} />
          </div>

        </Frame>
      );
    } else {
      return <Navigate to="/admin/signin" replace />;
    }
  };

  return (
    <div className="container" style={{ height: "107vh" }}>
      {renderHome()}
    </div>
  );
};
export default HomeAdmin;
