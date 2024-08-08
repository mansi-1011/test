import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import CategoryController from "../controllers/CategoryController.js";
import auth from "../middleware/auth.js";


const route = express.Router();

route.use(cors());
route.use(
  bodyParser.json({
    extended: true,
  })
);
route.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


/*------------ Multer Images Code  ------------ */

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/public/images/category");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (ext == "jpg" || ext == "jpeg" || ext == "png") {
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    } else {
      cb(new Error("Not valid extention..."), false);
    }
    //  else {
    //     cb(null, `extra/${file.fieldname}-${Date.now()}.${ext}`)
    // }
  },
});
const upload = multer({
  storage: multerStorage,
});
const UploadFiles = upload.fields([{
  name: "images",
}]);


/*------------ Add Category Data Routes ------------ */

route.post("/addcate", UploadFiles, CategoryController.addCategory);

/*------------ Get Category Data Routes ------------ */

route.get("/", CategoryController.getCategoryall);

/*------------ Delete Category Images Routes ------------ */

// route.delete("/delImg/:cid/:id", CategoryController.delete_images);

/*------------ Update Category Data Routes ------------ */

route.put("/upd/:id", UploadFiles, CategoryController.updateCategory);

/*------------ Delete Category Data Routes ------------ */

route.delete("/del", CategoryController.deleteCategory);

/*------------ MultipleDelete Category Data Routes ------------ */

route.delete("/mlpdelete", CategoryController.multipleDeleteCategory);

export default route;
