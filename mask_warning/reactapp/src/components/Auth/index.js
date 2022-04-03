export const initialLocalStorageConfig = () => {
  // get todayDay and lastVisitDay
  const todayDay = new Date().getDate();
  const lastVisitDay = localStorage.getItem("lastVisitDay");

  if (lastVisitDay) {
    // auto clear localStorage after 1 day
    if (lastVisitDay != todayDay) {
      // clear localStorage
      localStorage.clear();

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

export const signOut = () => {
  localStorage.clear();

  fetch("/auth/signout", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
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
