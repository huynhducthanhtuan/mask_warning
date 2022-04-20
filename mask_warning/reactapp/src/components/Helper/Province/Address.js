import React, { useState, useEffect, useRef } from "react";
import styles from "./Province.module.css";
const Address = ({ setCity, setDistrict }) => {
  const [cities, setCities] = useState([]);
  const [cityCode, setCityCode] = useState(0);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      const resCities = await fetch(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      const res = await resCities.json();

      setCities(await res);
    };
    getCities();
  }, []);

  const handleCityCode = async (event) => {
    setDistrict("");
    const getCityCode = event.target.value;
    const resDistrict = await fetch(
      `https://provinces.open-api.vn/api/p/${getCityCode}?depth=2`
    );
    const res = await resDistrict.json();

    setCity(res.name);
    setCityCode(getCityCode);
  };

  useEffect(() => {
    const getDistrict = async () => {
      if (cityCode !== 0) {
        const resDistrict = await fetch(
          `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
        );
        const res = await resDistrict.json();

        setDistricts(await res.districts);
      }
    };
    getDistrict();
  }, [cityCode]);

  const handleDistrict = (event) => {
    const getDistrict = event.target.value;
    setDistrict(getDistrict);
    // setData({ ...data, district: getDistrict });
  };

  return (
    <React.Fragment>
      <li className={`d-flex ${styles.item}`}>
        <label>Province/City: </label>
        <select
          name="city"
          onChange={(e) => handleCityCode(e)}
          className="form-select"
        >
          <option value="">--Select City--</option>
          {cities.map((city, index) => (
            <option key={index} value={city.code}>
              {city.name}{" "}
            </option>
          ))}
        </select>
      </li>
      <li className={`d-flex ${styles.item}`}>
        <label>District: </label>
        <select
          className="form-select"
          name="district"
          onChange={(e) => handleDistrict(e)}
        >
          <option value="">--Select District--</option>
          {districts.map((district, index) => (
            <option key={index} value={district.name}>
              {district.name}{" "}
            </option>
          ))}
        </select>
      </li>
    </React.Fragment>
  );
};

export default Address;
