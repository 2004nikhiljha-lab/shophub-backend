// middleware/errorMiddleware.js

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,          // show actual error message
    stack: process.env.NODE_ENV !== "production" ? err.stack : null, // show stack in dev
  });
};

module.exports = { notFound, errorHandler };
