"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSession = exports.redis = void 0;
const redis_1 = require("@upstash/redis");
require("dotenv/config");
// initialzed redis client
exports.redis = new redis_1.Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
// helper function sessionmanage karne ke kiye 
exports.redisSession = {
    //redis session set
    async setSession(sessionId, userData) {
        const key = `session:${sessionId}`;
        const value = JSON.stringify(userData);
        await exports.redis.set(key, value, { ex: 7 * 24 * 60 * 60 });
    },
    //redis get session
    async getSession(sessionId) {
        const key = (`session:${sessionId}`);
        const data = await exports.redis.get(key);
        if (!data)
            return null;
        return typeof data === "string" ? JSON.parse(data) : data;
    },
    async delSession(sessionId) {
        const key = `session:${sessionId}`;
        await exports.redis.del(key);
    }
};
