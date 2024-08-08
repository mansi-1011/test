import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ProductController from "../controllers/ProductController.js";
import multer from "multer";
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
    cb(null, "storage/public/images/product");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (ext == "jpg" || ext == "jpeg" || ext == "png") {
      cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
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
  limits: { fileSize: 2000000 },
});
const UploadFiles = upload.fields([
  {
    name: "product_images",
  },
]);

/*------------ Multer Image Code End ------------ */

/*------------ Get Category Data Routes ------------ */

route.get("/category", ProductController.getCategory);

/*------------ Get SubCategory Data Routes ------------ */

route.get("/subcate",ProductController.getSubCategory);

/*------------ Add Sub Category Data Routes ------------ */

route.post("/addproduct", UploadFiles, ProductController.addProduct);

/*------------ Get Product Data Routes ------------ */

route.get("/", ProductController.getProduct);

/*------------ Edit Product Data Routes ------------ */

route.get("/editproduct/:id",auth, ProductController.editProduct);

/*------------ Delete Product Images Routes ------------ */

route.delete("/delImg/:proId/:id",auth, ProductController.delete_images);

/*------------ Update Product Data Routes ------------ */

route.put("/upd/:id",auth, UploadFiles, ProductController.updateProduct);

/*------------ Delete Product Data Routes ------------ */

route.delete("/del/:id",auth, ProductController.deleteProduct);

/*------------ Delete Product By Category Data Routes ------------ */

// route.delete("/delbycategory", ProductController.deleteProductByCategory);

/*------------ MultipleDelete Product Data Routes ------------ */

route.delete("/mlpdelete",auth, ProductController.multipleDeleteProduct);

/*------------------------ Frontend Routes ------------------------*/

/*------------getProduct Routes ------------ */

route.get("/getpro", ProductController.getHomeProduct);

/*------------getCategory Routes ------------ */

route.get("/getcate", ProductController.getCategories);

/*------------getProduct By Slug Routes ------------ */

route.get("/slug/:slug", ProductController.getBySlug);

/*------------getSubCategory  Routes ------------ */

route.get("/getsubcate", ProductController.getSubcategories);

/*------------ get Product by id Route ------------ */

route.get("/getProduct/:id", ProductController.getProductById);

/*------------ get Product by id Route ------------ */

route.get("/getSubPro/:id", ProductController.getSubProductById);

/*------------ get Product Filet by Name Route ------------ */

route.get("/filters/:name", ProductController.getFilterProduct);

/*------------ get Product by Category name routes ------------ */

route.get("/slug_product/:slug", ProductController.getProductByCategory);

export default route;
