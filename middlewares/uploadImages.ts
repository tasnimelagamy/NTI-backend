import multer from "multer";
import ApiErrors from "../utils/apiErrors";
import { Request } from "express";
import { ImageFields } from "../interfaces/uploadFields";

const uploadOptions = (): multer.Multer => {

  // const multerStorage = multer.diskStorage({
  //   destination: function (req: Request, file: Express.Multer.File, cb) {
  //     cb(null, 'uploads')
  //   },
  //   filename: function (req, file, cb) {
  //     const ext = file.mimetype.split('/')[1];
  //     const fileName = `Product-${Date.now()}-cover.jpg`;
  //     cb(null, fileName)
  //   }
  // })

    const multerStorage: multer.StorageEngine = multer.memoryStorage();

    const multerFilter = function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
      if (file.mimetype.startsWith('image')) { cb(null, true) }
      else { cb(new ApiErrors('File Not an image', 400)) }
    }
  
    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
    return upload;
  }
  
  export const uploadSingleImage = (fieldName: string) => uploadOptions().single(fieldName)
  export const uploadMultiImages = (fields: ImageFields[])=>uploadOptions().fields(fields)

