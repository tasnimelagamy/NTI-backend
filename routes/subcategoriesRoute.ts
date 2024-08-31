import {Router} from "express"
import { createSubcategory, deleteSubcategory, getSubcategories, getSubcategory, updateSubcategory } from "../controllers/subcategories";
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utils/validation/subcategoriesValidator"
import { filterData } from './../controllers/subcategories';
const subcategoriesRoute: Router = Router({ mergeParams: true });



subcategoriesRoute.route('/')
.get(filterData,getSubcategories)
.post( createSubcategoryValidator,createSubcategory)

subcategoriesRoute.route('/:id')
.get(getSubcategoryValidator,getSubcategory)
.put(updateSubcategoryValidator,updateSubcategory)
.delete(deleteSubcategoryValidator,deleteSubcategory)



export default subcategoriesRoute;