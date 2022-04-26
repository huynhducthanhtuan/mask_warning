import React, { useState, useEffect, useRef } from "react";
import styles from "../AdminCreateUser/AdminCreateUser.module.css";

const Province = ({ setCity, setDistrict, setWard }) => {
  const [cities, setCities] = useState([]);
  const [cityCode, setCityCode] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState(0);
  const [wards, setWards] = useState([]);

  const districtRef = useRef();
  const cityRef = useRef();
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
  // https://provinces.open-api.vn/api/d/461?depth=2
  const handleCityCode = async (event) => {
    // setDistrict();
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
    const getDistrictCode = event.target.value;
    // console.log(getDistrictCode);
    setDistrictCode(getDistrictCode);
  };
  useEffect(() => {
    const getWards = async () => {
      if (districtCode !== 0) {
        const resWards = await fetch(
          `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        );
        const res = await resWards.json();
        // console.log(res);
        setWards(await res.wards);
        setDistrict(res.name);
      }
    };
    getWards();
  }, [districtCode]);

  const handleWard = (e) => {
    const getWard = e.target.value;
    setWard(getWard);
  };
  return (
    <React.Fragment>
      <li>
        <div className={`d-flex ${styles.boxContent}`}>
          <label>City</label>
          <span>*</span>
        </div>
        <select
          name="city"
          required={true}
          onChange={(e) => handleCityCode(e)}
          className={styles.slectOption}
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
        <div className={`d-flex ${styles.boxContent}`}>
          <label className="">City </label>
          <select
            name="city"
            onChange={(e) => handleCityCode(e)}
            className={styles.slectOption}
          >
            <option defaultValue="">--Select City--</option>
            {cities.map((city, index) => (
              <option key={index} value={city.code}>
                {city.name}{" "}
              </option>
            ))}
          </select>
        </div>
      </li>
      <li className={`d-flex ${styles.item}`}>
        <div className={`d-flex ${styles.boxContent}`}>
          <label>District</label>
          <select
            className={styles.slectOption}
            name="district"
            onChange={(e) => handleDistrict(e)}
          >
            <option defaultValue="">--Select District--</option>
            {districts.map((district, index) => (
              <option key={index} value={district.code}>
                {district.name}{" "}
              </option>
            ))}
            s
          </select>
        </div>
      </li>
      <li className={`d-flex ${styles.item}`}>
        <div className={`d-flex ${styles.boxContent}`}>
          <label className="">Wards</label>
          <select
            className={styles.slectOption}
            // name="district"
            onChange={(e) => handleWard(e)}
            // ref={districtRef}
          >
            <option defaultValue="">--Select Ward--</option>
            {wards.map((ward, index) => (
              <option key={index} value={ward.name}>
                {ward.name}{" "}
              </option>
            ))}
          </select>
        </div>
      </li>
    </React.Fragment>
  );
};

export default Province;
