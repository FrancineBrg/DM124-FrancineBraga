const checkAuth = (request, response, next) => {
    const token = request.headers.authorization;

    if (/ZG0xMjQ6ZG0xMjQ=/.test(token)) {
        next();
    } else {
        response.status(401).json({
        message: 'Not authorized'
        });
    }
};

module.exports = checkAuth;