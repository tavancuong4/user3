import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CardView.scss";
import userNam from "../images/nam.jpg";
import userNu from "../images/nu.jpg";
import { ThemeContext } from "../App";
import { connect } from "react-redux";
// import FormDelete from "./FormDelete";

const CustomerDetails = (props) => {
  const [dataUser, setDataUser] = useState([]);
  const navigate = useNavigate();
  const setDetail = useContext(ThemeContext);
  const ids = localStorage.getItem("id");
  const id = JSON.parse(ids);
  console.log("check id: ", id);

  useEffect(() => {
    (async function () {
      try {
        // let dataUser = props.dataRedux[id];
        // console.log("datail con :", props.dataRedux[id]);
        let res = await axios.get(`http://localhost:8000/api/customers/${id}`);
        let data = res && res.data ? res.data : [];
        setDataUser(data);
        // props.setTitle(true);
      } catch (e) {
        console.error(e);
      }
      console.log("check data:", dataUser);
    })();
  }, []);
  console.log("dataUser", dataUser);
  let isEmptyObj = Object.keys(dataUser).length === 0;

  return (
    <div className="listContainer">
      <div className="detail">
        <div className="container">
          {isEmptyObj === false && (
            <>
              <div className="image">
                {dataUser.gender === "male" ? (
                  <img src={userNam} alt="" />
                ) : (
                  <img src={userNu} alt="" />
                )}
              </div>
              <div className="name">
                {dataUser.firstName} - {dataUser.lastName}
              </div>
              <div>{dataUser.address}</div>
              <div>
                {dataUser.city},{dataUser.state.name}
              </div>
            </>
          )}
        </div>
        <div className="bottom">
          <div
            className="home"
            onClick={() => {
              navigate("/card");
              setDetail(false);
            }}
          >
            View all Customers
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataRedux: state,
  };
};

export default connect(mapStateToProps, null)(CustomerDetails);
