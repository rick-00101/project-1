"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const redis_1 = require("../config/redis");
const protectRoute = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.sessionId;
        if (!sessionId) {
            return res.status(401).json({
                message: "sessionId not found"
            });
        }
        const userData = await redis_1.redisSession.getSession(sessionId);
        if (!userData) {
            return (res.status(401).json({
                message: "userdata not found"
            }));
        }
        req.user = userData;
        next();
    }
    catch (error) {
        console.error("Middleware Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.protectRoute = protectRoute;
