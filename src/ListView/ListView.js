import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userNam from "../images/nam.jpg";
import userNu from "../images/nu.jpg";
import "./ListView.scss";
import { connect } from "react-redux";
import { ThemeContext } from "../App";
const ListView = (props) => {
  const { users } = props;
  const history = useNavigate();
  const [keyWord, setKeyWord] = useState("");
  const [showData, setShowData] = useState([]);
  const [list] = useState(6);
  const [total, setTotal] = useState(6);
  const setDetail = useContext(ThemeContext);
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       let res = await axios.get("http://localhost:8000/api/customers");
  //       let data = res && res.data ? res.data : [];
  //       setDataUser(data);
  //       setShowData(data.slice(0, list));
  //       setTotal(Math.ceil(data.length / list));
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     console.log(dataUser);
  //   })();
  // }, []);
  useEffect(() => {
    setShowData(users.slice(0, total));
    setTotal(Math.ceil(users.length / list));
    console.log("dataUsers:", users);
  }, []);

  const dayNutBam = (number) => {
    let arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr.map((item) => {
      return (
        <div key={item}>
          <button onClick={() => chuyenTrang(item)}>{item}</button>
        </div>
      );
    });
  };
  const chuyenTrang = (item) => {
    console.log(item);
    const end = list * item;
    setShowData(users.slice(end - list, end));
  };

  return (
    <div className="list-user">
      <div className="filter">
        <div>Filter</div>
        <input type="text" onChange={(e) => setKeyWord(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Order Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showData
            .filter((val) => {
              if (val === "") {
                return val;
              } else if (
                val.firstName.toLowerCase().includes(keyWord.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {item.gender === "male" ? (
                      <img src={userNam} alt="" />
                    ) : (
                      <img src={userNu} alt="" />
                    )}
                  </td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  {item.state.name ? (
                    <td>{item.state.name} </td>
                  ) : (
                    <td>{item.state} </td>
                  )}

                  <td>
                    $
                    {parseFloat(
                      item.orders?.[0].itemCost + item.orders?.[1].itemCost
                    ).toFixed(2)}
                  </td>

                  <td
                    className="back"
                    onClick={() => {
                      history(`/card/${item.id}/CardDetail`);
                      localStorage.setItem("id", item.id);
                      setDetail(true);
                    }}
                  >
                    Order View
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="bottom">{dayNutBam(total)}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state,
  };
};

export default connect(mapStateToProps, null)(ListView);
