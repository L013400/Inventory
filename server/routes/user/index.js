import { Router } from "express";
import UserController from "../../controllers/users/user.js"
import auth from "../../middlewares/auth.js"
const router = Router();


router.get('/',auth, UserController.getUserDetails)
router.post('/login',UserController.loginUser)

export default router;