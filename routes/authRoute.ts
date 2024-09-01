import { Router } from "express";
import { login, protectRoutes, signup } from "../controllers/auth";
// 
const authRoute: Router = Router();

authRoute.route('/signup').post(signup);
authRoute.route('/login').post(login);



export default authRoute;