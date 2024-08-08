import Order from "../models/Order.model.js";
// import orderItem from '../models/orderItem.model.js'
import lodash from "lodash";
const { trim } = lodash;

export default class OrderController {
  /*----------------------- Add Order Data  -----------------------*/

  static async addOrder(req, res) {
    const body = req.body;
    const cartItem = req.body.cartItem;
    const Orders = [];
    try {
      if (Orders) {
        cartItem.forEach((element) => {
          Orders.push({
            product_id: element._id,
            product_quantity: element.count,
          });
        });
      }

      const data = await Order.create({
        first_name: trim(body.first_name),
        last_name: trim(body.last_name),
        company: trim(body.company),
        address: trim(body.address),
        state: trim(body.state),
        postcode: trim(body.postcode),
        country: trim(body.country),
        city: trim(body.city),
        email: trim(body.email),
        phone: trim(body.phone),
        order_notes: trim(body.order_notes),
        cart_total: trim(body.cart_total),
        order_item: Orders,
        created_at: Date.now(),
      });
      res.json({
        status: true,
        message: "Order Add Successfully",
        order_id: data._id
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Worng..!",
      });
    }
  }
}
