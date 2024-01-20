const successResponse = (code = 200, message = "", data = {}) => {
  const successRes = {
    code: code,
    message: message,
    data: data,
  };
  return successRes;
};
const errorResponse = (code = 400, message = "", data = {}) => {
  const errRes = {
    code: code,
    message: message,
    data: data,
  };

  return errRes;
};
module.exports = {
  successResponse,
  errorResponse,
};
