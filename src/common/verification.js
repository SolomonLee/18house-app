export const verificationEmail = (email) => {
  if (email === "" || !email) {
    return false;
  } else {
    var emailRegxp = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/;
    if (emailRegxp.test(email) != true) {
      return false;
    }
  }

  return true;
};
