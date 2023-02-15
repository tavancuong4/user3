import React from "react";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkType, setCheckType] = useState("password");
  const [eye, setEye] = useState(false);

  const handleClickEye = () => {
    if (checkType === "password") {
      setCheckType("text");
      setEye(true);
    } else {
      setCheckType("password");
      setEye(false);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8000/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          navigate("/");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "users",
            JSON.stringify({ email: email, password: password })
          );
        })
        .catch((err) => {
          alert("You entered the wrong email or password ");
        });
    } catch (error) {
      alert("You the wrong sever ");
    }
  };

  return (
    <div className="login-container">
      <div className="title">
        <FaLock /> <span>Login</span>
      </div>
      <form>
        <label htmlFor="email">Email: </label>
        <input
          type="Email"
          name="email"
          placeholder="Nhap Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type={checkType}
          name="password"
          placeholder="Nhap Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <span className="eye">
          {" "}
          {eye ? (
            <FaEye onClick={() => handleClickEye()} />
          ) : (
            <FaEyeSlash onClick={() => handleClickEye()} />
          )}
        </span>
        <div>
          {" "}
          <input type="submit" className="submit" onClick={handleSignIn} />
        </div>
      </form>
    </div>
  );
};

export default Login;
