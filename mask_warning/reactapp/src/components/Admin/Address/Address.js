import React, { useState, useEffect, useRef } from "react";
import styles from "./Address.module.css";

const Address = ({ setCity, setDistrict, setWard, defaultValue }) => {
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

  const handleCityCode = async (event) => {
    const getCityCode = event.target.value;
    setCityCode(getCityCode);
  };

  useEffect(() => {
    const getDistrict = async () => {
      if (cityCode !== 0) {
        const resDistrict = await fetch(
          `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
        );
        const res = await resDistrict.json();
        setCity(res.name);
        setDistricts(await res.districts);
      }
    };
    getDistrict();
  }, [cityCode]);

  const handleDistrictCode = (event) => {
    const getDistrictCode = event.target.value;
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
      <li className={`d-flex ${styles.item}`}>
        <label className="">City </label>
        <select
          name="city"
          className="form-select"
          onChange={(e) => handleCityCode(e)}
          ref={cityRef}
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
        <label>District</label>
        <select
          className="form-select"
          name="district"
          onChange={(e) => handleDistrictCode(e)}
          ref={districtRef}
        >
          <option value="">--Select District--</option>
          {districts.map((district, index) => (
            <option key={index} value={district.code}>
              {district.name}{" "}
            </option>
          ))}
          s
        </select>
      </li>
      <li className={`d-flex ${styles.item}`}>
        <div className={`d-flex ${styles.boxContent}`}>
          <label className="">Wards</label>
          <select className="form-select" onChange={(e) => handleWard(e)}>
            <option value="">--Select Ward--</option>
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

export default Address;
