const errorException = (err, _req, res, _next) => {
    switch (true) {
        case typeof err === 'string':
            const is404 = err;
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ mensaje: err });
        default:
            return res.status(500).json({ mensaje: err.message });
    }
}

module.exports = errorException;