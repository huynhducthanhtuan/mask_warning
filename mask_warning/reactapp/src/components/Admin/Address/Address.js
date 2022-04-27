import React, { useState, useEffect, useRef } from "react";
import styles from "./Address.module.css";

const Address = ({ wardRef, districtRef, cityRef, cities, defaultValue }) => {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isSelect, setIsSelect] = useState(true);

  const handleChangeCity = async (event) => {
    setDistricts([]);
    setWards([]);

    const dis = cities.filter((city) => {
      return city.name === cityRef.current.value;
    });
    setDistricts(dis[0].districts);
  };

  const handleChangeDistrict = async (event) => {
    const ward = districts.filter((district) => {
      return district.name === districtRef.current.value;
    });
    setWards(ward[0].wards);
  };

  const readDistrict = () => {
    // const getDistricts = cities.filter((city) => {
    //   return city.name === defaultValue.hometown;
    // });
    // setDistricts(getDistricts[0].districts);
    // setIsSelect(false);
    // console.log(getDistricts[0].districts);
    // console.log(isSelect);
  };

  useEffect(() => {
    const getDistricts = cities.filter((city) => {
      return city.name === defaultValue.hometown;
    });

    const getWards = getDistricts[0].districts.filter((district) => {
      return district.name === defaultValue.district;
    });

    setDistricts(getDistricts[0].districts);
    setWards(getWards[0].wards);
  }, [defaultValue.hometown]);

  return (
    <React.Fragment>
      <li className={`d-flex ${styles.item}`}>
        <label className="">Province/City:</label>
        <select
          name="city"
          className="form-select"
          onChange={(e) => handleChangeCity(e)}
          ref={cityRef}
        >
          {cities.map((city, index) => {
            if (defaultValue.hometown === city.name) {
              return (
                <option key={index} value={city.name} selected>
                  {city.name}{" "}
                </option>
              );
            } else {
              return (
                <option key={index} value={city.name}>
                  {city.name}{" "}
                </option>
              );
            }
          })}
        </select>
      </li>
      <li className={`d-flex ${styles.item}`}>
        <label>District</label>
        <select
          className="form-select"
          name="district"
          onChange={(e) => handleChangeDistrict(e)}
          ref={districtRef}
          onClick={readDistrict}
        >
          {districts.map((district, index) => {
            if (defaultValue.district === district.name) {
              return (
                <option key={index} value={district.name} selected>
                  {district.name}{" "}
                </option>
              );
            } else {
              return (
                <option key={index} value={district.name}>
                  {district.name}{" "}
                </option>
              );
            }
          })}
        </select>
      </li>
      <li className={`d-flex ${styles.item}`}>
        <div className={`d-flex ${styles.boxContent}`}>
          <label className="">Wards</label>
          <select className="form-select" ref={wardRef}>
            {wards.map((ward, index) => {
              if (defaultValue.ward === ward.name) {
                return (
                  <option key={index} value={ward.name} selected>
                    {ward.name}{" "}
                  </option>
                );
              } else {
                return (
                  <option key={index} value={ward.name}>
                    {ward.name}{" "}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </li>
    </React.Fragment>
  );
};

export default Address;
