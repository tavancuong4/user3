import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { FaBars, FaPlus, FaUsers, FaWindows } from "react-icons/fa";
import { connect } from "react-redux";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import NotFound from "../../user2/src/NotFound/NotFound";

import "./App.scss";
import CardView from "./CardView/CardView";
import CustomerDetails from "./CardView/CustomerDetails";
import Detail from "./Detail/Detail";
import Home from "./Home/Home";
import CustomerOrders from "./ListView/CustomerOrders";
import ListView from "./ListView/ListView";
import Login from "./Login/Login";
import EditCustomer from "./News/EditCustomer";
import News from "./News/News";
import FormEdit from "./Settings/FormEdit";

export const ThemeContext = createContext();

function App(props) {
  const [detail, setDetail] = useState(false);
  const navigate = useNavigate();
  const userss = localStorage.getItem("users");
  const users = JSON.parse(userss);
  const token = localStorage.getItem("token");

  const handleLogout = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const user = localStorage.getItem("users");
    const body = JSON.parse(user);
    axios
      .post("http://localhost:8000/api/logout", body, config)
      .then(
        localStorage.removeItem("token"),
        navigate("/login"),
        console.log("Ban da thanh cong")
      )
      .catch(console.log("Ban da that bai"));
  };
  let isEmptyObj = Object.keys(users).length === 0;
  return (
    <div className="App">
      <div className="title-contain">
        <div className="manager">
          <FaUsers className="icon1" /> Customer Manager
        </div>
        <div className="navbar">
          <nav>
            <ul className="topnav">
              {!token ? (
                <li className="right">
                  <NavLink to="/login" className="link">
                    <FaPlus className="icon" />
                    Login
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="left">
                    <NavLink
                      to="/card"
                      className="link"
                      onClick={() => setDetail(false)}
                    >
                      <FaWindows className="icon" /> Customer
                    </NavLink>
                  </li>
                  <li className="center">
                    <NavLink to="/setting" className="link">
                      <FaBars className="icon" /> Settings
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/login"
                      className="link"
                      // onClick={() => {
                      //   localStorage.removeItem("token");
                      //   navigate("/login");
                      // }}
                      onClick={(e) => handleLogout(e)}
                    >
                      {isEmptyObj === false && <span>{users.email}</span>}
                      (Logout)
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <ThemeContext.Provider value={setDetail}>
        <Routes>
          {!token ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <>
              <Route path="/" element={<Home detail={detail} />}>
                <Route path="card" element={<CardView />}>
                  <Route path=":id" element={<Detail />} />
                  <Route path=":id/CardDetail" element={<CustomerDetails />} />
                  <Route path=":id/ListDetail" element={<CustomerOrders />} />
                  <Route path=":id/Edit" element={<EditCustomer />} />
                </Route>

                <Route path="list" element={<ListView />} />
                <Route path="list/:id" element={<Detail />} />
                <Route path="news" element={<News />} />
              </Route>
              <Route path="/setting" element={<FormEdit />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/logout" /> */}
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
