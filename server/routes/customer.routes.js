import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import customer from "../middleware/customer.js";
import CustomerController from "../controllers/CustomerController.js";

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

/*------------ User Register Data Routes ------------ */

route.post("/register", CustomerController.register);

/*------------ User Login Routes ------------ */

route.post("/login", CustomerController.login);

/*------------ User login Routes ------------ */

route.get("/useauth", customer, CustomerController.userAuth);

export default route;
