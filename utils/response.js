class Response {
    constructor(statusCode, data, error, message) {
      this.statusCode = statusCode;
      this.data = {data};
      this.error = error;
      this.message = message;
    }
  
    static success(data, message = '') {
      return new Response(200, data, false, message);
    }
  
    static error(statusCode, message, error = true) {
      return new Response(statusCode, null, error, message);
    }
  }
  
  module.exports = Response;
  