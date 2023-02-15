export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
// export const loadUsers = () => (dispatch) => {
//   dispatch({ type: LOAD_USERS_LOADING });
//   Api.getUsers()
//     .then((response) => response.json())
//     .then(
//       (data) => dispatch({ type: LOAD_USERS_SUCCESS, data }),
//       (error) =>
//         dispatch({
//           type: LOAD_USERS_ERROR,
//           error: error.message || "Unexpected Error!!!",
//         })
//     );
// };
