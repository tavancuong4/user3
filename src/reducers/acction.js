import * as Types from "./acctionTypes";

export const actFetchUsers = (users) => {
  return {
    type: Types.FETCH_USERS,
    users,
  };
};
export const actDeleteUsers = (id) => {
  return {
    type: Types.DELETE_USER,
    id,
  };
};
export const actAddUsers = (users) => {
  return {
    type: Types.ADD_USER,
    users,
  };
};
export const actUpdateUsers = (user) => {
  return {
    type: Types.UPDATE_USER,
    user,
  };
};
