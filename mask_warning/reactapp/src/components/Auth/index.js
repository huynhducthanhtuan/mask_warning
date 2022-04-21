export const initialLocalStorageConfig = () => {
  // get todayDay and lastVisitDay
  const todayDay = new Date().getDate();
  const lastVisitDay = localStorage.getItem("lastVisitDay");

  if (lastVisitDay) {
    // auto clear key jwt in localStorage after 7 days
    if (todayDay - lastVisitDay >= 7) {
      // clear key jwt in localStorage
      localStorage.removeItem("jwt");

      // set new date for lastVisitDay
      localStorage.setItem("lastVisitDay", JSON.stringify(todayDay));
    }
  } else {
    // set todayDay for lastVisitDay
    localStorage.setItem("lastVisitDay", JSON.stringify(todayDay));
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  }
};
