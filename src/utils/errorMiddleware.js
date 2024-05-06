const HttpStatusCode = require('./httpStatusCode');
const ApiError = require('./apiError');

// Error handling middleware that uses the ApiError class and HttpStatusCode enum
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

module.exports = errorMiddleware;
