const throwError = (code, message) => {
  const error = new Error(message);
  error.status = code;
  throw error;
};

module.exports = {
  throwError
}