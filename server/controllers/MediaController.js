import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class MediaController {
  /*------------ This Code is Display Images By Api ------------ */

  /*----------------------- Get Images For User Module  -----------------------*/

  static async getImages(req, res) {
    res.sendFile(
      path.join(__dirname, "/../storage/public/images/user/", req.params.name)
    );
  }

  /*----------------------- Get Images For Category Module  -----------------------*/

  static async getCategoryImages(req, res) {
    res.sendFile(
      path.join(
        __dirname,
        "/../storage/public/images/category/",
        req.params.name
      )
    );
  }

  /*----------------------- Get Images For Subcategory Module  -----------------------*/

  static async getSubCategoryImages(req, res) {
    res.sendFile(
      path.join(
        __dirname,
        "/../storage/public/images/subcategory/",
        req.params.name
      )
    );
  }

  /*----------------------- Get Images For Product Module  -----------------------*/

  static async getProductImages(req, res) {
    res.sendFile(
      path.join(
        __dirname,
        "/../storage/public/images/product/",
        req.params.name
      )
    );
  }
}
