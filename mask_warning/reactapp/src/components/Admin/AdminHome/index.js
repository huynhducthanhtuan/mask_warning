import React, { useRef, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import StatisticCard from "../AdminStatisticCard";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
const HomeAdmin = () => {
  const [toggle, setToggle] = useState("home");

  const [statisticToggle, setStatisticToggle] = useState("week");

  const dataUsersStatistic = {
    week: 6,
    month: 23,
    year: 153,
  };

  const dataAvarageHoursStatistic = {
    week: 15,
    month: 22,
    year: 20,
  };

  return (
    <div className="container" style={{height: "107vh"}}>
      <div className="row">
        <LeftControl />
        <div className="col-10">
            <div className={styles.homeTabContents}>
              <ShowBox />
              <div>
                <div className={styles.homeStatisticButtonGroup}>
                  <div
                    className={
                      statisticToggle === "week"
                        ? `${styles.homeStatisticButton} ${styles.active}`
                        : styles.homeStatisticButton
                    }
                    onClick={() => setStatisticToggle("week")}
                  >
                    <img src="./icons/ellipse.png" />
                    <p>Week</p>
                  </div>
                  <div
                    className={
                      statisticToggle === "month"
                        ? `${styles.homeStatisticButton} ${styles.active}`
                        : styles.homeStatisticButton
                    }
                    onClick={() => setStatisticToggle("month")}
                  >
                    <img src="./icons/ellipse.png" />
                    <p>Month</p>
                  </div>
                  <div
                    className={
                      statisticToggle === "year"
                        ? `${styles.homeStatisticButton} ${styles.active}`
                        : styles.homeStatisticButton
                    }
                    onClick={() => setStatisticToggle("year")}
                  >
                    <img src="./icons/ellipse.png" />
                    <p>Year</p>
                  </div>
                </div>
                <div className={styles.homeStatisticCards}>
                  <StatisticCard
                    cardName={"User(s)"}
                    data={dataUsersStatistic[statisticToggle]}
                    dataType={" new user(s)"}
                    iconLink={"./icons/new_users.png"}
                  />
                  <StatisticCard
                    cardName={"Average hour(s) per day"}
                    data={dataAvarageHoursStatistic[statisticToggle]}
                    dataType={" hour(s) per day"}
                    iconLink={"./icons/average_hours.png"}
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
