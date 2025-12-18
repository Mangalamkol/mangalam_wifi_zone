module.exports = function validatePassword(pwd) {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,10}$/;

  return regex.test(pwd);
};