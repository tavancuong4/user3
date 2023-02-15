import React, { useState } from "react";
import "./News.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { actAddUsers } from "../reducers/acction";

const News = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleClickCancel = (props) => {
    firstName = "";
    lastName = "";
    address = "";
    city = "";
    state = "";
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let data = {
      id: Math.floor(Math.random() * 100),
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: { abbreviation: "", name: state },
      userId: 1,
    };
    props.createUserRedux(data);
    let res = await axios.post("http://localhost:8000/api/customers", data);
    if (res && res.data) {
      let newBlog = res.data;
      console.log("check data:", newBlog);
      // props.handleAddNew(newBlog);
      // res.data.
    }
  };
  const navigate = useNavigate();
  console.log("check props:", props.dataRedux);
  return (
    <div className="form-container">
      <form action="" method="get">
        <div className="row">
          <label htmlFor="fname">First name:</label>
          <input
            type="text"
            name="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="lname">Last name:</label>
          <input
            type="text"
            name="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="state">State:</label>
          <input
            type="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="one">
            <button className="cancel" onClick={() => handleClickCancel()}>
              Cancel
            </button>
            <button className="insert" type="submit" onClick={handleAdd}>
              Insert
            </button>
          </div>
        </div>
      </form>
      <div
        className="bottom"
        onClick={() => {
          navigate("/card");
        }}
      >
        View all Customers
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataRedux: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUserRedux: (data) => dispatch(actAddUsers(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
// export default connect(mapStateToProps, mapDispatchToProps)(Color(Home));
