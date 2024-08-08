import lodash from "lodash";
import Customer from "../models/Customer.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs";
const { toLower } = lodash;
const { trim } = lodash;

export default class CustomerController {
  /*----------------------- Register Customer Data   -----------------------*/

  static async register(req, res) {
    try {
      var pass = await bcrypt.hash(req.body.password, 10);
      await Customer.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: toLower(req.body.email),
        password: pass,
      });
      res.json({
        status: true,
        message: "You Are Register Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Email Already in Use",
      });
    }
  }

  /*----------------------- Login Customer Data -----------------------*/

  static async login(req, res) {
    try {
      const user = await Customer.findOne({
        email: toLower(req.body.email),
      });
      if (!user) {
        res.json({
          status: false,
          message: "Invalid User , Please try again !!" ,
        });
      } else {
        const PassConfirm = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (PassConfirm) {
          const token = Jwt.sign(
            {
              email: user.email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: 60 * process.env.JWT_TIME,
            }
          );
          res.json({
            status: true,
            message: "User Logged In Successfully",
            token: token,
            username : user.email
          });
        } else {
          res.json({
            status: false,
            message: "Password is not match",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }

  
  /*----------------------- Check User  Data -----------------------*/

  static async userAuth(req, res) {
    let response = {
      customer: true,
      CustomerData: req.customer,
      message: "User Login true",
    };
    res.json(response);

  }
}
