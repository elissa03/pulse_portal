// const getLocalStorageUser = () => {
//   const parseUser = JSON.parse(localStorage.getItem("user"));
//   return parseUser;
// };

const getLocalStorageUser = () => {
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    // Handle the error here, like logging to an error reporting service
  }
  return null;
};


const setLocalStorageUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getToken = () => {
  const parsedUser = getLocalStorageUser();
  return parsedUser.token;
};

export default {
  getLocalStorageUser,
  setLocalStorageUser,
  getToken,
};
