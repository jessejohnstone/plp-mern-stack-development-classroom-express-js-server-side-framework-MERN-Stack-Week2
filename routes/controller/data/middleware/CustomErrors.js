class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation error') {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
};

module.exports = { AppError, NotFoundError, ValidationError, UnauthorizedError, errorHandler };
