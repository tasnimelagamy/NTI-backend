import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getUser, getUsers, resizeUserImage, updateUser, uploadUserImage } from "../controllers/users";
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utils/validation/userValidator";
 import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const usersRoute: Router = Router();
 usersRoute.use(protectRoutes, checkActive, allowedTo('manager'))
usersRoute.route('/')
  .get(getUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRoute.route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

 usersRoute.put('/:id/changePassword', changeUserPassword)

export default usersRoute;