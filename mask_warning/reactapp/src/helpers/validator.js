export const validateFullName = (fullname) => {
  const firstLetter = "[A-EGHIK-VXYÂĐỔÔÚỨ]".normalize("NFC");
  const otherLetters =
    "[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]".normalize(
      "NFC"
    );
  const regexString =
    "^" +
    firstLetter +
    otherLetters +
    "+\\s" +
    "(" +
    firstLetter +
    otherLetters +
    "+\\s)*" +
    firstLetter +
    otherLetters +
    "+$";
  const regexPattern = RegExp(regexString);

  if (regexPattern.test(fullname.normalize("NFC"))) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Fullname is not valid",
    };
  }
};

export const validateEmail = (email) => {
  const regexp =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  const checkingResult = regexp.exec(email);

  if (checkingResult !== null) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Email is not valid",
    };
  }
};

export const validatePhoneNumber = (phoneNumber) => {
  const regexp = /^\d{10}$/;
  const checkingResult = regexp.exec(phoneNumber);

  if (checkingResult !== null) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Phone number must has 10 numbers",
    };
  }
};

export const validateStoreName = (storeName) => {
  const firstLetter = "[A-EGHIK-VXYÂĐỔÔÚỨ]".normalize("NFC");
  const otherLetters =
    "[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]".normalize(
      "NFC"
    );
  const regexString =
    "^" +
    firstLetter +
    otherLetters +
    "+\\s" +
    "(" +
    firstLetter +
    otherLetters +
    "+\\s)*" +
    firstLetter +
    otherLetters +
    "+$";
  const regexPattern = RegExp(regexString);

  if (regexPattern.test(storeName.normalize("NFC"))) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Store name is not valid",
    };
  }
};

export const validateAddress = (address) => {
  if (address.length >= 10) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Address is not valid",
    };
  }
};

export const validatePassword = (password) => {
  if (password.length >= 15) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Password length must has more 15 characters",
    };
  }
};

export const validateVideoStreamUrl = (videoStreamUrl) => {
  const regex = new RegExp(
    /(rtsp):\/\/([^\s@/]+)@([^\s/:]+)(?::([0-9]+))?(\/.*)/gm
  );

  return regex.test(videoStreamUrl);
};

export const validateTitleBug = (title) => {
  if (title.length >= 7) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Title bug is not valid",
    };
  }
};

export const validateDescriptionBug = (description) => {
  if (description.length >= 10) {
    return { isValid: true, error: "" };
  } else {
    return {
      isValid: false,
      error: "Description bug is not valid",
    };
  }
};
