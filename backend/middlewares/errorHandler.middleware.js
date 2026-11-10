import {
  AppError,
  ValidationError,
  ConflictError,
  DatabaseError,
} from "../errors/index.js";
import { logger } from "../config/logger.js";
import { parseMongoDuplicateError } from "../utils/errorHandling.utils.js";

export const errorHandler = (err, req, res, next) => {

  logger.error(err.stack);
  
  let error = err;

  if (err.name === "ValidationError" && !(err instanceof AppError)) {
    const errors = err.errors
      ? Object.values(err.errors).map((e) => ({
          field: e.path,
          message: e.message,
        }))
      : [];

    error = new ValidationError("Validation failed", errors);
  }

  else if (err.name === "CastError") {
    error = new ValidationError(`Invalid ${err.path}: ${err.value}`, [
      {
        field: err.path,
        message: `Invalid value "${err.value}"`,
      },
    ]);
  }
  
  else if (err.code === 11000) {
    const {field, value, message} = parseMongoDuplicateError(err);
    error = new ConflictError(`${field} already exists`, [
      {
        field,
        message,
      },
    ]);
  }

  else if (err.name === "MongoNetworkError") {
    error = new DatabaseError("Database connection failed");
  }

  if (!(error instanceof AppError)) {
    error = new AppError({
      message: err.message || "Internal Server Error",
      statusCode: 500,
      errorCode: "INTERNAL_SERVER_ERROR",
      isOperational: false,
    });
  }

  const response = {
    success: false,
    error: {
      message: error.message,
      code: error.errorCode,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
    },
  };

  if (error.details) {
    response.error.details = error.details;
  }

  if (process.env.NODE_ENV === "development") {
    response.error.stack = err.stack;
  }

  res.status(error.statusCode).json(response);
};