import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from "express"
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from './subcategoriesRoute';
import ApiErrors from "../utils/apiErrors";
import globalErrors from "../middlewares/globalErrors";
import productsRoute from './products';
import usersRoute from './usersRoute';
import authRoute from './authRoute';

const mountRoutes = (app: Application): void =>{
    app.use('/api/v1/categories',categoriesRoute)
    app.use('/api/v1/subcategories',subcategoriesRoute)
    app.use('/api/v1/products',productsRoute)
    app.use('/api/v1/users',usersRoute)
    app.use('/api/v1/auth',authRoute)

     app.all('*', (req: Request, res: Response, next: NextFunction) => {
         next(new ApiErrors(`the router ${req.originalUrl}`,400))
    })
  app.use(globalErrors);
}
export default mountRoutes;