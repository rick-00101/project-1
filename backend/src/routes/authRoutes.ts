import { Request, Response, Router} from "express";
import { googleAuthHandler } from "../controllers/authController";
import { logoutHandler } from "../controllers/authController";
import { protectRoute } from "../middleware/auth";
const router = Router();


router.route("/v1/google/login").post(googleAuthHandler);



router.route("/v1/google/logout").post(logoutHandler);




router.route("/v1/me").get(protectRoute , (req , res )=>{
    return res.status(200).json({
    success: true,
    message: "User is authenticated and persistence checked",
    user: req.user,
    })
})





export default router;
 
