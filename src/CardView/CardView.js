import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "./CardView.scss";
import { useNavigate } from "react-router-dom";
import userNam from "../images/nam.jpg";
import userNu from "../images/nu.jpg";
import { FaPenSquare } from "react-icons/fa";
import { connect } from "react-redux";
import { ThemeContext } from "../App";
import { actFetchUsers } from "../reducers/acction";

const CardView = (props) => {
  // let [dataUsers, setDataUsers] = useState([]);
  const history = useNavigate();
  const [showData, setShowData] = useState([]);
  const { users } = props;
  const [total, setTotal] = useState(6);
  const [totalNut, setTotalNut] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  let select = React.createRef();
  const setDetail = useContext(ThemeContext);

  useEffect(() => {
    (async function () {
      try {
        let res = await axios.get("http://localhost:8000/api/customers");
        let data = res && res.data ? res.data : [];
        props.fetchAllUsers(data);
        // setDataUsers(props);

        // // let show = res.data.slice(0, total);
        // setShowData(dataUsers.slice(0, total));
        // setTotalNut(Math.ceil(dataUsers.length / total));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  useEffect(() => {
    setShowData(users.slice(0, total));
    setTotalNut(Math.ceil(users.length / total));
    console.log("dataUsers:", users);
  }, []);

  const taoDaySo = (number) => {
    let arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr.map((element) => {
      return (
        <div key={element}>
          <button onClick={() => chuyenTrang(element)}>{element}</button>
        </div>
      );
    });
  };

  const chuyenTrang = (element, btn) => {
    console.log("element:", element);
    let end = total * element;
    setShowData(users.slice(end - total, end));
  };
  const thayDoiSoLuong = () => {
    console.log(select.current.value);
    setTotal(select.current.value);
    setShowData(users.slice(0, select.current.value));
    setTotalNut(Math.ceil(users.length / select.current.value));
  };

  console.log("dataRedux: ", users);
  return (
    <div className="container">
      <div className="filter">
        <div>Filter</div>
        <input type="text" onChange={(e) => setKeyWord(e.target.value)} />
      </div>
      <div className="list-user">
        {showData
          .filter((val) => {
            if (keyWord === "") {
              return val;
            } else if (
              val.firstName.toLowerCase().includes(keyWord.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item, index) => {
            return (
              <div className="user" key={index}>
                <div className="top">
                  {item.firstName} {item.lastName}
                  <span
                    onClick={() => {
                      history(`/card/${item.id}/edit`);
                      localStorage.setItem("id", item.id);
                      setDetail(true);
                    }}
                  >
                    {" "}
                    <FaPenSquare className="icon" />
                  </span>
                </div>
                <div className="under">
                  <div className="under-left">
                    {item.gender === "male" ? (
                      <img src={userNam} alt="" />
                    ) : (
                      <img src={userNu} alt="" />
                    )}
                  </div>
                  <div className="under-right">
                    <div>{item.city}</div>
                    {item.state.name ? (
                      <div>{item.state.name} </div>
                    ) : (
                      <div>{item.state} </div>
                    )}

                    <div
                      className="back"
                      onClick={() => {
                        history(`/card/${item.id}/CardDetail`);
                        localStorage.setItem("id", item.id);
                        setDetail(true);
                      }}
                    >
                      View Orders
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="bottom">
        {taoDaySo(totalNut)}
        <select ref={select} onChange={thayDoiSoLuong}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="25">25</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllUsers: (users) => {
      dispatch(actFetchUsers(users));
    },
    // deleteUserRedux: (userdelete) =>
    //   dispatch({ type: "DELETE_USER", payload: userdelete }),
    // createUserRedux: (data) => dispatch({ type: "CREATE_USER", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardView);
