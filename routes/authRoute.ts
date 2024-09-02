import { Router } from "express";
import { forgetPassword, login,verifyResetCode, resetCode,  signup } from "../controllers/auth";
import { loginValidator, sendMailValidator, signupValidator ,resetCodeValidator} from "../utils/validation/authValidator";
// 
const authRoute: Router = Router();

authRoute.route('/signup').post(signupValidator, signup);
authRoute.route('/login').post(loginValidator, login);
authRoute.route('/forgetPassword').post(sendMailValidator, forgetPassword);
 authRoute.route('/verifyCode').post(verifyResetCode);
 authRoute.route('/resetCode').put(resetCodeValidator, resetCode);

export default authRoute;