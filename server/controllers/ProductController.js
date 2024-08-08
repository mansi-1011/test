import Category from "../models/Category.model.js";
import SubCategory from "../models/SubCategory.model.js";
import Product from "../models/Product.model.js";
import { unlink } from "fs";
import slug from "slug";
import lodash from "lodash";
import _ from "lodash";
import "dotenv/config";
const { trim } = lodash;

export default class ProductController {
  /*----------------------- Get Category Data  -----------------------*/

  static async getCategory(_req, res) {
    try {
      var category = await Category.find({});
      // console.log(category);
      res.json({
        status: true,
        category: category,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Category",
        error: error,
      });
    }
  }

  /*----------------------- Get Sub Category Data  -----------------------*/

  static async getSubCategory(req, res) {
    try {
      var subcategory = await SubCategory.find({});
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

  /*----------------------- Add Product Data  -----------------------*/

  static async addProduct(req, res) {
    const files = req.files.product_images;
    const images = [];
    const body = req.body;

    if (images) {
      files.forEach((element) => {
        images.push({
          name: element.filename,
          path: `${element.destination}/${element.filename}`,
        });
      });
    }
    try {
      await Product.create({
        category_id: body.category_id,
        subcategory_id: body.subcategory_id,
        product_name: trim(body.product_name),
        slug_name: slug(trim(body.product_name)),
        status: body.status,
        brand: trim(body.brand),
        description: trim(body.description),
        color: trim(body.color),
        weight: trim(body.weight),
        price: body.price,
        sku: trim(body.sku),
        quantity: body.quantity,
        product_images: images,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      res.json({
        status: true,
        message: "Product Add Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Worng..!",
      });
    }
  }

  /*----------------------- Get Product Data  -----------------------*/

  static async getProduct(req, res) {
    try {
      var product = await Product.find()
        .populate("category_id")
        .populate("subcategory_id");
      res.json({
        status: true,
        product: product,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Product",
        error: error,
      });
    }
  }

  /*----------------------- edit Product Data   -----------------------*/

  static async editProduct(req, res) {
    try {
      var id = req.params.id;
      const product = await Product.findOne({ _id: id });
      res.json({
        status: true,
        product: product,
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }

  /*----------------------- Edit Products Delete Images   -----------------------*/

  static async delete_images(req, res) {
    var _id = req.params.proId;
    var id = req.params.id;
    try {
      var product = await Product.findById(_id);
      var img = product.product_images.id(id);
      unlink(`../server/${img.path}`, (err) => {
        if (err) throw err;
      });
      product.product_images.pull({
        _id: id,
      });
      await product.save();
      res.json({
        status: true,
        message: "Image Deleted Successfully",
        product_images: product.product_images,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Wrong!!",
      });
    }
  }

  /*----------------------- Update SubCategory Data   -----------------------*/

  static async updateProduct(req, res) {
    var id = req.params.id;
    const body = req.body;
    var pimages = req.files.product_images || [];
    var result = await Product.findById(id);
    var ImgLmt = 12 - result.product_images.length;

    try {
      if (pimages.length <= ImgLmt) {
        if (pimages) {
          pimages.forEach((element) => {
            result.product_images.push({
              name: element.filename,
              path: `${element.destination}/${element.filename}`,
            });
          });
        } else {
          result.product_images;
        }
      } else {
        res.json({
          status: false,
          message: "Check number of Media you can upload",
        });
      }

      result.category_id = body.category_id;
      result.subcategory_id = body.subcategory_id;
      result.product_name = trim(body.product_name);
      result.slug_name = slug(trim(body.product_name));
      result.status = body.status;
      result.brand = trim(body.brand);
      result.description = trim(body.description);
      result.color = trim(body.color);
      result.weight = trim(body.weight);
      result.price = body.price;
      result.sku = trim(body.sku);
      result.quantity = body.quantity;
      // result.product_images = pimages;
      result.updated_at = Date.now();
      await result.save();
      res.json({
        status: true,
        message: "Update Product Successfully",
        product: result,
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }

  /*----------------------- Detele SubCategory Data   -----------------------*/

  static async deleteProduct(req, res) {
    var id = req.params.id;
    try {
      var product = await Product.findByIdAndDelete(id);
      var Images = product.product_images;
      Images.forEach((image) => {
        unlink(`../server/${image.path}`, (err) => {
          if (err) throw err;
        });
      });
      res.json({
        status: true,
        message: "Product Deleted Successfully",
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

  static async multipleDeleteProduct(req, res) {
    const id = req.body.id;
    const product = await Product.find({ _id: id });

    try {
      if (product) {
        product.forEach((product) => {
          var Images = product.product_images;
          Images.forEach((image) => {
            unlink(`../server/${image.path}`, (err) => {
              if (err) throw err;
            });
          });
        });
      }
      await Product.deleteMany({ _id: id });
      res.json({
        status: true,
        message: "Multiple Product Deleted Successfully",
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

  /*  static async deleteProductByCategory(req, res) {
    var id = req.body.id;
    const product = await Product.find({ category_id: id });

    try {
      if (product) {
        product.forEach((product) => {
          var Images = product.product_images;
          unlink(`../server/${Images.path}`, (err) => {
            if (err) throw err;
          });
        });
      }
      await Product.deleteMany({ category_id: id });
      res.json({
        status: true,
        message: "product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Something wrong!!",
      });
    }
  } */

  /*-----------------------  Frontend Product functions -----------------------*/

  /*-----------------------  get Product Data -----------------------*/

  static async getHomeProduct(req, res) {
    try {
      var product = await Product.find({ status: "active" });
      res.json({
        status: true,
        product: product,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Product",
        error: error,
      });
    }
  }

  /*-----------------------  get Product Data By Slug -----------------------*/

  static async getBySlug(req, res) {
    var slug = req.params.slug;
    try {
      const product = await Product.findOne({
        slug_name: slug,
      });
      res.json({
        status: true,
        productData: product,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        productData: [],
      });
    }
  }

  /*-----------------------  get Product Data By Slug -----------------------*/
  static async getCategories(_req, res) {
    try {
      var category = await Category.find({});
      // console.log(category);
      res.json({
        status: true,
        category: category,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Category",
        error: error,
      });
    }
  }

  /*-----------------------  get SubCategories Data By id -----------------------*/
  static async getSubcategories(req, res) {
    try {
      var subcategory = await SubCategory.find({});
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

  /*-----------------------  get product By id -----------------------*/

  static async getProductById(req, res) {
    var id = req.params.id;
    try {
      var products = await Product.find({ category_id: id });
      res.json({
        status: true,
        products: products,
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
  /*-----------------------  get SubCategory product By id -----------------------*/
  static async getSubProductById(req, res) {
    var id = req.params.id;
    try {
      var products = await Product.find({ subcategory_id: id });
      res.json({
        status: true,
        products: products,
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

  /*-----------------------  get Filter Product Data -----------------------*/

  static async getFilterProduct(req, res) {
    var body = req.params.name;
    try {
      if (body === "high") {
        var products = await Product.find({ status: "active" }).sort({
          price: "desc",
        });
      } else if (body === "low") {
        var products = await Product.find({ status: "active" }).sort({
          price: "asc",
        });
      } else if (body === "new") {
        var products = await Product.find({ status: "active" }).sort({
          created_at: "desc",
        });
      } else {
        var products = await Product.find({ status: "active" });
      }
      res.json({
        status: true,
        products: products,
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
  /*-----------------------  get Product data by category name -----------------------*/

  static async getProductByCategory(req, res) {
    var slug = req.params.slug;
    try {
      var category = await Category.findOne({ category_name: slug });
      var product = await Product.find({ category_id: category._id });
      res.json({
        status: true,
        product: product,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting Category",
        error: error,
      });
    }
  }
}
