const initialState = {
  loggedIn: false,
  user_data: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        loggedIn: true,
        user_data: action.userData,
      };
    case "LOGOUT_USER":
      return {
        loggedIn: false,
        user_data: {},
      };

    default:
      return state;
  }
};
