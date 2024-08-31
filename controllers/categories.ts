import { Request, Response, NextFunction} from "express"
import asyncHandler from "express-async-handler"
import categoriesModel from "../models/categoriesModel"
import { Categories } from './../interfaces/categories';
import ApiErrors from "../utils/apiErrors";

export const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction)  => { 
 const category: Categories =  await categoriesModel.create(req.body);
 res.status(201).json({data: category})
 });

 export const getCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const categories = await categoriesModel.find();
    res.status(200).json({data: categories});
  })
 export const getCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const category = await categoriesModel.findById(req.params.id);
    if(!category){return next(new ApiErrors('category not found',404))};
    res.status(200).json({data: category});
  })
 export const updateCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const category = await categoriesModel.findByIdAndUpdate(req.params.id, req.body, { new:true });
    if(!category){return next(new ApiErrors('category not found',404))};
    res.status(200).json({data: category});
  })
  
 export const deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const category = await categoriesModel.findByIdAndDelete(req.params.id);
    if(!category){return next(new ApiErrors('category not found',404))};
    res.status(204).json();
  })