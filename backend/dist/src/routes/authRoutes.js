"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.route("/google").post(authController_1.googleAuthHandler);
router.route("/logout").post(authController_1.logoutHandler);
exports.default = router;
