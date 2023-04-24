const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (req, res, next) => {
    let token = req.header('authorization')

    if (!token) {
        return res.status(403).send({ message: "No Token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;