const apiKeys = require('./apiKeys');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${ req.originalUrl }`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack
  });
}

function apiKeyHandler(req, res, next) {
  const keyRequired = process.env.API_KEY_REQUIRED || 'false';
  if (keyRequired === 'false') {
    next();
  }
  const apiKey = req.get('X-API-KEY');
  if (apiKeys().has(apiKey)) {
    next();
  } else {
    res.status(401).json({
      message: 'Invalid API Key'
    });
  }
}

module.exports = {
  notFound,
  errorHandler,
  apiKeyHandler
};
