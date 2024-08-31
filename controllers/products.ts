import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import { NextFunction, Request, Response } from "express";
import multer from "multer"
import { FilterData } from "../interfaces/filterData";
import { Products } from "../interfaces/products";
import productsModel from "../models/productsModel";
import ApiErrors from "../utils/apiErrors";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
    console.log(file);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `Product-${Date.now()}-cover.jpg`;
    cb(null, fileName)
  }
})

const multerFilter = function(req: Request, res: Response, file:any, cb:any){
  if(file.mimetype.startswith('image')){cb(null, true)}
  
  else{cb(new ApiErrors('file not an image',400),false)}
}
export const upload = multer({storage:multerStorage})


// export const filterData = (req: Request, res: Response, next: NextFunction) => {
//   let filterData: FilterData = {};
//   if (req.params.categoryId) { filterData.category = req.params.categoryId };
//   req.filterData = filterData;
//   next();
// }

export const createProduct = createOne<Products>(productsModel)
export const getProducts = getAll<Products>(productsModel, 'products')
export const getProduct = getOne<Products>(productsModel)
export const updateProduct = updateOne<Products>(productsModel)
export const deleteProduct = deleteOne<Products>(productsModel) 
