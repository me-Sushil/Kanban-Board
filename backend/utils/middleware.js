const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorhandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    // Invalid ObjectId format (e.g., malformed MongoDB _id)
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    // Mongoose schema validation failed (invalid or missing data)
    return res.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    // Unique constraint violation (duplicate value for a field marked as unique)
    return res.status(400).json({ error: "Duplicate field value" });
  } else if (error.name === "Error") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "StrictPopulateError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "TypeError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "ReferenceError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "SyntaxError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandler,
};