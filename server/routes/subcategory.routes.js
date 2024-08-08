import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SubCategoryController from "../controllers/SubCategoryController.js";
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
    cb(null, "storage/public/images/subcategory");
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
const UploadFiles = upload.fields([
  {
    name: "subcategory_images",
  },
]);

/*------------ Multer Image Code End ------------ */

/*------------ Get Subcategory Category Data Routes ------------ */

route.get("/category", auth, SubCategoryController.getCategory);

/*------------ Add Sub Category Data Routes ------------ */

route.post(
  "/addsubcate",
  auth,
  UploadFiles,
  SubCategoryController.addSubCategory
);

/*------------ Get Category Data Routes ------------ */

route.get("/", auth, SubCategoryController.getSubCategory);

/*------------ Delete SubCategory Images Routes ------------ */

// route.delete("/delImg/:cid/:id", SubCategoryController.delete_images);

/*------------ Edit SubCategory Data Routes ------------ */

route.get("/editsubcate/:id", auth, SubCategoryController.editSubCategory);

/*------------ Update SubCategory Data Routes ------------ */

route.put(
  "/upd/:id",
  auth,
  UploadFiles,
  SubCategoryController.updateSubCategory
);

/*------------ Delete SubCategory Data Routes ------------ */

route.delete("/del", auth, SubCategoryController.deleteSubCategory);

/*------------ Delete SubCategory By Category Data Routes ------------ */

// route.delete(
//   "/delbycategory",
//   SubCategoryController.deleteSubCategoryByCategory
// );

/*------------ MultipleDelete SubCategory Data Routes ------------ */

route.delete(
  "/mlpdelete",
  auth,
  SubCategoryController.multipleDeleteSubCategory
);

/*------------------------ Frontend Routes ------------------------*/

/*------------getCategory Routes ------------ */

route.get("/getsubcate", SubCategoryController.getSubCategories);

/*------------getCategory Routes ------------ */

route.get("/getsubcatename/:slug", SubCategoryController.getsubcatename);


export default route;
