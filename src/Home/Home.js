import React, { useState } from "react";
import {
  FaBars,
  FaPlus,
  FaWindows,
  FaList,
  FaTags,
  FaPenSquare,
} from "react-icons/fa";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import "./Home.scss";
import CardView from "../CardView/CardView";
import ListView from "../ListView/ListView";
import News from "../News/News";
import CustomerDetails from "../CardView/CustomerDetails";
import CustomerOrders from "../ListView/CustomerOrders";
import EditCustomer from "../News/EditCustomer";
import Detail from "../Detail/Detail";

const Home = (props) => {
  const [dataUsers, setDataUsers] = useState([]);
  // const setDetail = useContext(ThemeContext);
  console.log("detail: ", props.detail);
  // const id = localStorage.getItem("id");

  const { id } = useParams();
  const courses = [
    { type: "CardDetail" },
    { type: "ListDetail" },
    { type: "Edit" },
  ];

  return (
    <div>
      <div className="contain-container">
        <div className="navbar">
          {props.detail === false ? (
            <nav>
              <ul className="topnav">
                <li>
                  <NavLink to="/card" className="link">
                    <FaWindows className="icon" />
                    Card View
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/list" className="link">
                    <FaBars className="icon" />
                    List View
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" className="link">
                    <FaPlus className="icon" />
                    New Customer
                  </NavLink>
                </li>
              </ul>
            </nav>
          ) : (
            <nav>
              <h3> Customer Information</h3>
              <ul className="topnav">
                {courses.map((course, index) => (
                  <li key={index}>
                    <NavLink
                      to={"/card/" + id + "/" + course.type}
                      className="link"
                    >
                      <FaWindows className="icon" />
                      {course.type}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/card" element={<CardView />} />
        <Route path="/card/:id" element={<Detail courses={courses} />} />

        <Route path="/card/:id/CardDetail" element={<CustomerDetails />} />
        <Route path="/card/:id/ListDetail" element={<CustomerOrders />} />
        <Route path="/card/:id/Edit" element={<EditCustomer />} />
        <Route path="/list" element={<ListView />} />
        <Route path="/list/:id" element={<Detail />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  );
};

export default Home;
