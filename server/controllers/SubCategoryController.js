import Validate from "../validation/validate.js";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";
import SubCategory from "../models/SubCategory.model.js";
import _ from "lodash";
import { unlink } from "fs";
import fs from "fs";
import "dotenv/config";

export default class SubCategoryController {
  /*----------------------- Get Category Data  -----------------------*/

  static async getCategory(_req, res) {
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
        message: "Error in getting User",
        error: error,
      });
    }
  }

  /*----------------------- Add Sub Category Data  -----------------------*/

  static async addSubCategory(req, res) {
    var errors = Validate.AddSubCate(req.body);
    const files = req.files.subcategory_images;
    const images = _.first(files);
    if (errors.status) {
      try {
        await SubCategory.create({
          category_id: req.body.category_id,
          subcategory_name: req.body.subcategory_name,
          subcategory_images: {
            name: images.filename,
            path: `${images.destination}/${images.filename}`,
          },
          created_at: Date.now(),
          updated_at: Date.now(),
        });
        res.json({
          status: true,
          message: "Sub Category Add Successfully",
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

  /*----------------------- Get Sub Category Data  -----------------------*/

  static async getSubCategory(req, res) {
    try {
      var subcategory = await SubCategory.find().populate("category_id");
      res.json({
        status: true,
        subcategory: subcategory,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Subcategory",
        error: error,
      });
    }
  }

  /*----------------------- Edit Time To Delete Images   -----------------------*/

  // static async delete_images(req, res) {
  //   var category_id = req.params.cid;
  //   var id = req.params.id;
  //   try {
  //     var category = await Category.findById(category_id);
  //     var img = category.images.id(id);
  //     unlink(`../server/${img.path}`, (err) => {
  //       if (err) throw err;
  //     });
  //     category.images.pull({
  //       _id: id,
  //     });
  //     await category.save();
  //     res.json({
  //       status: true,
  //       message: "Image Deleted...",
  //       images: category.images,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({
  //       status: false,
  //       message: "Delete Failed...",
  //     });
  //   }
  // }

  /*----------------------- edit SubCategory Data   -----------------------*/

  static async editSubCategory(req, res) {
    try {
      var id = req.params.id;
      const subcategory = await SubCategory.findOne({ _id: id });
      res.json({
        status: true,
        subcategory: subcategory,
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }

  /*----------------------- Update SubCategory Data   -----------------------*/

  static async updateSubCategory(req, res) {
    var id = req.params.id;
    const subcategory = await SubCategory.findById(id);
    var new_image = "";
    const files = req.files.subcategory_images;
    var images = _.first(files);
    if (images !== undefined) {
      new_image = {
        name: images.filename,
        path: `${images.destination}/${images.filename}`,
      };
      try {
        fs.unlinkSync(
          `../server/${subcategory.subcategory_images.path}`,
          (err) => {
            if (err) throw err;
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = subcategory.subcategory_images;
    }
    let addSubCategory = {
      category_id: req.body.category_id,
      subcategory_name: req.body.subcategory_name,
      subcategory_images: new_image,
      updated_at: Date.now(),
    };
    const errors = Validate.AddSubCate(addSubCategory);
    if (errors.status) {
      try {
        var result = await SubCategory.findByIdAndUpdate(id, addSubCategory);
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

  /*----------------------- Detele SubCategory Data   -----------------------*/

  static async deleteSubCategory(req, res) {
    var id = req.body.id;
    try {
      /* Products record delete Code Start */
      var products = await Product.find({ subcategory_id: id });
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
      await Product.deleteMany({ subcategory_id: id });
      /* Code End */

      /* SubCategory record delete Code Start */
      var subcategory = await SubCategory.findByIdAndDelete(id);
      var subcategory_Images = subcategory.subcategory_images;
      unlink(`../server/${subcategory_Images.path}`, (err) => {
        if (err) throw err;
      });
      /* Code End */

      res.json({
        status: true,
        message: "SubCategory And Product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Something wrong!!",
      });
    }
  }

  /*----------------------- Detele Multiple SubCategory Data   -----------------------*/

  static async multipleDeleteSubCategory(req, res) {
    const id = req.body.id;

    try {
      /* Products record delete Code Start */
      var products = await Product.find({ subcategory_id: id });
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
      await Product.deleteMany({ subcategory_id: id });
      /* Code End */

      /* SubCategory record delete Code Start */
      const subcategories = await SubCategory.find({ _id: id });
      if (subcategories) {
        subcategories.forEach((subcategory) => {
          var Images = subcategory.subcategory_images;
          unlink(`../server/${Images.path}`, (err) => {
            if (err) throw err;
          });
        });
      }
      await SubCategory.deleteMany({ _id: id });
      /* Code End */

      res.json({
        status: true,
        message: "Multiple SubCategories And Products Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Delete Failed ",
      });
    }
  }

  /*-----------------------  Detele SubCategory By Category   -----------------------*/

  // static async deleteSubCategoryByCategory(req, res) {
  //   var id = req.body.id;
  //   const subcategories = await SubCategory.find({ category_id: id });

  //   try {
  //     if (subcategories) {
  //       subcategories.forEach((subcategory) => {
  //         var Images = subcategory.subcategory_images;
  //         unlink(`../server/${Images.path}`, (err) => {
  //           if (err) throw err;
  //         });
  //       });
  //     }
  //     const subcategory = await SubCategory.deleteMany({ category_id: id });
  //     res.json({
  //       status: true,
  //       message: "Sub Category Deleted Successfully",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({
  //       status: false,
  //       message: "Something wrong!!",
  //     });
  //   }
  // }

  /*-----------------------  Frontend Sub Category functions -----------------------*/

  /*----------------------- Get Sub Category Data  -----------------------*/

  static async getSubCategories(req, res) {
    try {
      var subcategory = await SubCategory.find().populate("category_id");
      res.json({
        status: true,
        subcategory: subcategory,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Subcategory",
        error: error,
      });
    }
  }
  /*----------------------- Get subcategory by category name  -----------------------*/

  static async getsubcatename(req, res) {
    var name = req.params.slug;
    try {
      var category = await Category.findOne({ category_name: name });
      var subcategory = await SubCategory.find({ category_id: category._id });
      res.json({
        status: true,
        subcategory: subcategory,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Subcategory",
        error: error,
      });
    }
  }
}
