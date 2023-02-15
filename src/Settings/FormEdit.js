import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { number } from "yup";
import "./FormEdit.scss";

const FormEdit = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberPage, setNumberPage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateAll = () => {
    const msg = {};
    if (!currentEmail) {
      msg.currentEmail = "Please input currentEmail";
    } else if (!newEmail) {
      msg.newEmail = "Please input newEmail";
    } else if (newEmail === currentEmail) {
      msg.newEmail = "Please enter different from currentEmail";
    } else if (!password) {
      msg.password = "Please input password";
    } else if (!numberPage) {
      msg.numberPage = "Please input numberPage";
    }
    setErrorMessage(msg);
    if (Object.keys(msg).length > 0) return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = {
      currentEmail: currentEmail,
      newEmail: newEmail,
      password: password,
      numberPerPage: numberPage,
    };
    axios
      .post("http://localhost:8000/api/users", body, config)
      .then(
        localStorage.setItem(
          "users",
          JSON.stringify({ email: newEmail, password: password })
        ),
        console.log("Ban da thanh cong")
      )
      .catch(console.log("Ban da that bai"));
  };
  console.log(localStorage.getItem("token"));
  return (
    <div className="container">
      <form>
        <h1>
          <FaUsers className="icon" /> Setting
        </h1>
        <div className="formInput">
          <label htmlFor="">Current Email:</label>
          <input
            type="email"
            placeholder="currentEmail"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
          <span>{errorMessage.currentEmail}</span>
        </div>
        <div className="formInput">
          <label htmlFor="">New Email:</label>
          <input
            type="email"
            placeholder="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <span>{errorMessage.newEmail}</span>
        </div>
        <div className="formInput">
          <label htmlFor="">ConFirm Password:</label>
          <input
            type="password"
            placeholder="confirmPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>{errorMessage.password}</span>
        </div>
        <div className="formInput">
          <label htmlFor="">Number of Page:</label>
          <input
            type="number"
            placeholder="number"
            value={numberPage}
            onChange={(e) => setNumberPage(e.target.value)}
          />
          <span>{errorMessage.numberPage}</span>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default FormEdit;
