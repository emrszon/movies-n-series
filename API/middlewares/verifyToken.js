const jwt = require('jsonwebtoken');
const { errorResponse } = require('../Utils/HttpAPI');

const authenticateUser = (req, res, next) => {
    const bearer = req.header('authorization');
    const token = bearer.split(' ')[1]// For any authenticated request, need to pass auth-token header
    if (!token) return res.status(401).send('Access denied')

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const { iat } = jwt.decode(token)
        const isExpired = (Date.now()) > ((iat + 20200) * 1000)

        if (isExpired) {
            return errorResponse(res, 401, { message: "Token  expirado! Vuelve a iniciar sesion." })
        }
        req.user = verified;

    } catch (error) {
        return errorResponse(res, 400, { message: error })
    }

    next();
}

module.exports = authenticateUser;