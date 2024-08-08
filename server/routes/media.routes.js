import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import MediaController from '../controllers/MediaController.js';

const route = express.Router();

route.use(cors())
route.use(bodyParser.json({
    extended: true
}))
route.use(bodyParser.urlencoded({
    extended: true
}))

/*------------ Get user Images Routes ------------ */ 

route.get('/user/:name', MediaController.getImages)

/*------------ Get Category Images Routes ------------ */ 

route.get('/category/:name', MediaController.getCategoryImages)

/*------------ Get Sub Category Images Routes ------------ */ 

route.get('/subcategory/:name', MediaController.getSubCategoryImages)

/*------------ Get Product Images Routes ------------ */ 

route.get('/product/:name', MediaController.getProductImages)

export default route