import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from "express"
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from './subcategoriesRoute';
import ApiErrors from "../utils/apiErrors";
import globalErrors from "../middlewares/globalErrors";
import { Products } from './../interfaces/products';
import productsRoute from './products';

const mountRoutes = (app: Application): void =>{
    app.use('/api/v1/categories',categoriesRoute)
    app.use('/api/v1/subcategories',subcategoriesRoute)
    app.use('/api/v1/products',productsRoute)

     app.all('*', (req: Request, res: Response, next: NextFunction) => {
         next(new ApiErrors(`the router ${req.originalUrl}`,400))
    })
  app.use(globalErrors);
}
export default mountRoutes;