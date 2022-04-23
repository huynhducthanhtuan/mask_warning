import React, { useRef, useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import StatisticCard from "../AdminStatisticCard";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
// import { showNewUser } from "../../../apis";
import Loading from "../../Helper/Loading";
import { ellipse, averageHours, newUsers } from "../../../assets/ExportImages";
const HomeAdmin = () => {
  const newUser = [null, null, null];
  const [toggle, setToggle] = useState("home");
  const [newUsers, setNewUsers] = useState({ newUser });
  const [statisticToggle, setStatisticToggle] = useState("m");
  const [loading, setLoading] = useState(true);

  // const loadDataNewUsers = () => {
  //   showNewUser().then((result) => {
  //     console.log(result);
  //     setNewUsers(result);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   loadDataNewUsers();
  // }, []);

  var dataUsersStatistic = {
    w: newUsers.newUser[0],
    m: newUsers.newUser[1],
    y: newUsers.newUser[2],
  };

  const dataAvarageHoursStatistic = {
    w: 15,
    m: 22,
    y: 20,
  };

  return (
    <div className="container" style={{ height: "107vh" }}>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <div className="row">
        <LeftControl />
        <div className="col-10">
          <div className={styles.homeTabContents}>
            <ShowBox />
            <div>
              <div className={styles.homeStatisticButtonGroup}>
                <div
                  className={
                    statisticToggle === "w"
                      ? `${styles.homeStatisticButton} ${styles.active}`
                      : styles.homeStatisticButton
                  }
                  onClick={() => setStatisticToggle("w")}
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
                  onClick={() => setStatisticToggle("m")}
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
                  onClick={() => setStatisticToggle("y")}
                >
                  <img src={ellipse} />
                  <p>Year</p>
                </div>
                <div
                  className={
                    statisticToggle === "year"
                      ? `${styles.homeStatisticButton} ${styles.active}`
                      : styles.homeStatisticButton
                  }
                  onClick={() => setStatisticToggle("year")}
                >
                  <img src={ellipse} />
                  <p>Year</p>
                </div>
              </div>
              <div className={styles.homeStatisticCards}>
                <StatisticCard
                  cardName={"User(s)"}
                  data={dataUsersStatistic[statisticToggle]}
                  dataType={" new user(s)"}
                  iconLink={newUsers}
                />
                <StatisticCard
                  cardName={"Average hour(s) per day"}
                  data={dataAvarageHoursStatistic[statisticToggle]}
                  dataType={" hour(s) per day"}
                  iconLink={averageHours}
                />
              </div>
              <div className={styles.homeStatisticCards}>
                <StatisticCard
                  cardName={"User(s)"}
                  data={dataUsersStatistic[statisticToggle]}
                  dataType={" new user(s)"}
                  iconLink={newUsers}
                />
                <StatisticCard
                  cardName={"Average hour(s) per day"}
                  data={dataAvarageHoursStatistic[statisticToggle]}
                  dataType={" hour(s) per day"}
                  iconLink={averageHours}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeAdmin;
