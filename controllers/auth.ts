import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import { Users } from '../interfaces/users';
import usersModel from '../models/usersModel';
import { createToken } from '../utils/createToken';
import ApiErrors from '../utils/apiErrors';


export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: Users = await usersModel.create(req.body);
    const token =createToken(user._id );
    res.status(201).json({ token, data: user })
  });

  export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(new ApiErrors('Invalid email or password', 401));
    }
    const token = createToken(user._id);
    res.status(200).json({ token, message: 'logged in successfully' });
  });
  export const protectRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1- check if token found
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else { return next(new ApiErrors('login first to access the application', 401)) }
    // 2- check if token not expired
    const decodedToken: any = Jwt.verify(token, process.env.JWT_SECRET_KEY!);
    // 3- check if user exist
    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) { return next(new ApiErrors("user doesn't exist", 401)) }
    // 4- check if password changed
    if (currentUser.passwordChangedAt instanceof Date) {
      const changedPasswordTime: number = (currentUser.passwordChangedAt.getTime() / 1000);
      if (changedPasswordTime > decodedToken.iat) { return next(new ApiErrors('please login again', 401)) }
    }
    req.user = currentUser;
    next();
  });

  export const allowedTo = (...roles: string[]) => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!(roles.includes(req.user?.role ?? ''))) {
      return next(new ApiErrors("you can't access this", 403))
    }
    next();
  });
  
  export const checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.active) {
      return next(new ApiErrors('your account is not active', 403))
    }
    next();
  });