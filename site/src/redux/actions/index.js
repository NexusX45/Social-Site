export const LoginUser = (user) => {
  return {
    type: "LOGIN_USER",
    userData: user,
  };
};

export const LogoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
