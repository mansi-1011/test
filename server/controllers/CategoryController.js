import Validate from "../validation/validate.js";
import Category from "../models/Category.model.js";
import SubCategory from "../models/SubCategory.model.js";
import Product from "../models/Product.model.js";
import { unlink } from "fs";
import fs from "fs";
import _ from "lodash";
import "dotenv/config";
export default class CategoryController {
  /*----------------------- Add Category Data -----------------------*/

  static async addCategory(req, res) {
    var errors = Validate.AddCate(req.body);
    if (errors.status) {
      const files = req.files.images;
      const images = _.first(files);
      try {
        await Category.create({
          category_name: req.body.category_name,
          images: {
            name: images.filename,
            path: `${images.destination}/${images.filename}`,
          },
          created_at: Date.now(),
          updated_at: Date.now(),
        });
        res.json({
          status: true,
          message: "Category Add Successfully",
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: false,
          message: "Somthing Worng..!",
        });
      }
    } else {
      res.json(errors);
    }
  }

  /*----------------------- Get Category Data -----------------------*/

  static async getCategoryall(req, res) {
    try {
      var category = await Category.find({});
      res.json({
        status: true,
        category: category,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting category",
        error: error,
      });
    }
  }

  /*-----------------------  Edit Time To Delete Images  -----------------------*/

  /*  static async delete_images(req, res) {
    var category_id = req.params.cid;
    var id = req.params.id;
    try {
      var category = await Category.findById(category_id);
      var img = category.images.id(id);
      unlink(`../server/${img.path}`, (err) => {
        if (err) throw err;
      });
      category.images.pull({
        _id: id,
      });
      await category.save();
      res.json({
        status: true,
        message: "Image Deleted Successfully",
        images: category.images,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing worng !!",
      });
    }
  } */

  /*-----------------------  Update Category Data  -----------------------*/

  static async updateCategory(req, res) {
    var id = req.params.id;
    const category = await Category.findById(id);
    var new_image = "";
    const files = req.files.images;
    var images = _.first(files);
    if (images !== undefined) {
      new_image = {
        name: images.filename,
        path: `${images.destination}/${images.filename}`,
      };
      try {
        fs.unlinkSync(`../server/${category.images.path}`, (err) => {
          if (err) throw err;
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = category.images;
    }
    let addCategory = {
      category_name: req.body.category_name,
      images: new_image,
      updated_at: Date.now(),
    };
    const errors = Validate.AddCate(addCategory);
    if (errors.status) {
      try {
        var result = await Category.findByIdAndUpdate(id, addCategory);
        res.json({
          status: true,
          message: "Update Category Successfully",
          category: result,
        });
      } catch (error) {
        res.json({
          status: false,
          message: "Somthing Wrong !!",
        });
      }
    } else {
      res.json(errors);
    }
  }

  /*----------------------- Detele Category Data  -----------------------*/

  static async deleteCategory(req, res) {
    var id = req.body.id;

    try {
      /* subcategory record delete Code Start */
      var subcategory = await SubCategory.find({ category_id: id });
      if (subcategory) {
        subcategory.forEach((subcategory) => {
          var subcategory_Images = subcategory.subcategory_images;
          unlink(`../server/${subcategory_Images.path}`, (err) => {
            if (err) throw err;
          });
        });
      }
      await SubCategory.deleteMany({ category_id: id });
      /* Code End */

      /* Products record delete Code Start */
      var products = await Product.find({ category_id: id });
      if (products) {
        products.forEach((product) => {
          var products_Images = product.product_images;
          products_Images.forEach((image) => {
            unlink(`../server/${image.path}`, (err) => {
              if (err) throw err;
            });
          });
        });
      }
      await Product.deleteMany({ category_id: id });
      /* Code End */

      /* Category record delete Code Start */
      var category = await Category.findByIdAndDelete(id);
      var category_Images = category.images;
      unlink(`../server/${category_Images.path}`, (err) => {
        if (err) throw err;
      });
      /* Code End */

      res.json({
        status: true,
        message: "Category , SubCategory and Product Delete Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }

  /*----------------------- Detele Multiple Category Data  -----------------------*/

  static async multipleDeleteCategory(req, res) {
    const id = req.body.id;

    try {
      /* subcategory record delete Code Start */
      var subcategory = await SubCategory.find({ category_id: id });
      if (subcategory) {
        subcategory.forEach((subcategory) => {
          var subcategory_Images = subcategory.subcategory_images;
          unlink(`../server/${subcategory_Images.path}`, (err) => {
            if (err) throw err;
          });
        });
      }
      await SubCategory.deleteMany({ category_id: id });
      /* Code End */

      /* Products record delete Code Start */
      var products = await Product.find({ category_id: id });
      if (products) {
        products.forEach((product) => {
          var products_Images = product.product_images;
          products_Images.forEach((image) => {
            unlink(`../server/${image.path}`, (err) => {
              if (err) throw err;
            });
          });
        });
      }
      await Product.deleteMany({ category_id: id });
      /* Code End */

      /* Category record delete Code Start */
      const categories = await Category.find({ _id: id });
      if (categories) {
        categories.forEach((category) => {
          var Images = category.images;
          unlink(`../server/${Images.path}`, (err) => {
            if (err) throw err;
          });
        });
      }
      await Category.deleteMany({ _id: id }); // var Images = user.images;
      /* Code End */

      res.json({
        status: true,
        message:
          "Multiple Categories , Subcategories and Product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }
}
