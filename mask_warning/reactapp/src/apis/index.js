/* ROLE USER */
export const signInAPI = (data) => {
  return fetch("auth/signin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};
export const signOutApi = () => {
  return fetch("auth/signout")
    .then((res) => res.json())
    .catch((err) => err);
};

export const saveVideoStreamUrlAPI = (data) => {
  return fetch("/save-video-stream-url/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const getVideoStreamUrlAPI = (data) => {
  return fetch("/get-video-stream-url/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const changePasswordApi = (data) => {
  console.log(data);
  return fetch("change-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const submitEmailApi = (data) => {
  return fetch("forgot-password-submit-email/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const submitCodeApi = (data) => {
  return fetch("forgot-password-submit-code/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const resendCodeApi = (data) => {
  return fetch("forgot-password-resend-code/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const createNewPasswordApi = (data) => {
  return fetch("forgot-password-create-new-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const viewProfile = (data) => {
  return fetch("profile/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const updateProfile = (data) => {
  return fetch("update-profile/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const updateAvatar = (data) => {
  return fetch("change-avatar/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const viewReportList = () => {
  return fetch("/admin/reports-manager/")
    .then((res) => res.json())
    .catch((err) => err);
};

export const viewReportDetail = (data) => {
  return fetch("/admin/reports-manager/detail-report/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const viewReportDetailUser = (reportId) => {
  return fetch("/admin/reports-manager/detail-user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportId),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const viewDetailUser = (userId) => {
  return fetch("/admin/users-manager/detail-user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const viewUserList = () => {
  return fetch("/admin/users-manager/")
    .then((res) => res.json())
    .catch((err) => err);
};

export const sendReport = (data) => {
  return fetch("/send-report/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};
/* ROLE ADMIN */
export const signInAdminAPI = (data) => {
  return fetch("/auth/admin/signin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const reportsHistory = (userId) => {
  return fetch("/report-history/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  })
    .then((res) => res.json())
    .catch((err) => err);
};
export const viewNotificationAPI = (quantity = 0) => {
  return fetch(`/admin/notifications/${quantity}`)
    .then((res) => res.json())
    .catch((err) => err);
};

export const notifications = (userId) => {
  return fetch("/admin/notifications/4")
    .then((res) => res.json())
    .catch((err) => err);
};

export const deleteUser = (userId) => {
  return fetch("/admin/users-manager/delete-user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
};
export const countNewNotificationsQuantityAPI = () => {
  return fetch("/admin/notifications/new-notifications-quantity/")
    .then((res) => res.json())
    .catch((err) => err);
};
