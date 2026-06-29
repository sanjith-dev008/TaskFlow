const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        req.user = user;

        next();

    }

    catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;