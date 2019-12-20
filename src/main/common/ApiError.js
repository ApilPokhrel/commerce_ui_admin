class ApiError extends Error {
  constructor(name, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = name;
    this.date = new Date();
  }
}

export default ApiError;
