const res = {
  responseData: (message, result = {}, success) => {
    var response = {};
    response.success = success;
    response.message = message;
    response.results = result;
    return response;
  },
};

export default res;
