"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    const statusCode = 500;
    console.log(err.message, err.stack);
    res.status(statusCode).json({
        message: err.message,
        stack: err.stack,
    });
};
exports.errorHandler = errorHandler;
