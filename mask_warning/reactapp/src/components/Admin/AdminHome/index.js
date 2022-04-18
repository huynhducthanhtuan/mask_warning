import React, { useRef, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import StatisticCard from "../AdminStatisticCard";
import LeftControl from "../AdminLeftControl";
import ShowBox from "../ShowBox";
import { ellipse, averageHours, newUsers} from "../../../assets/ExportImages";
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
    <div className="container" >
      <div className="row" >
        <LeftControl />
        <div>
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
                    <img src={ellipse}/>
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
                    <img src={ellipse}/>
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
                    <img src={ellipse}/>
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
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default HomeAdmin;
