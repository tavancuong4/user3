import * as Types from "./acctionTypes";
const initState = [];

var findIndex = (users, id) => {
  var result = -1;
  users.forEach((user, index) => {
    if (user.id === id) {
      result = index;
    }
  });
  return result;
};

const rootReducer = (state = initState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case Types.FETCH_USERS:
      state = action.users;
      return [...state];
    case Types.DELETE_USER:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case Types.ADD_USER:
      let user = action.payload;
      console.log("add: ", action.payload);
      return [...state, user];
    case Types.UPDATE_USER:
      index = findIndex(state, action.user.id);
      console.log("id:", action.user.id);
      state[index] = action.user;
      console.log("user:", action.user);
      return [...state];
    default:
      return state;
  }
};
export default rootReducer;
