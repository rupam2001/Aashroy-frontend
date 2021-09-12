import Cookies from "js-cookie";

const getAccessToken = () => {
  return Cookies.get("access_token");
};
const setAccessToken = (value) => {
  Cookies.set("access_token", value, { expires: 30, path: "" });
};
const getRefreshToken = () => {
  return Cookies.get("refresh_token");
};
const setRefreshToken = (value) => {
  Cookies.set("refresh_token", value, { expires: 30, path: "" });
};

const handlePostFetching = (res) => {
  const { access_token } = res;
  if (!access_token) return;
  setAccessToken(access_token);
};

export {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  handlePostFetching,
};