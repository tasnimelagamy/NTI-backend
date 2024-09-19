import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
import { createOrder, filterOrders, getOrder, getOrders, isOrderDelivered, isOrderPaid } from "../controllers/orders";
import {  getOrderValidator } from "../utils/validation/orderValidator";

const ordersRoute: Router = Router();
ordersRoute.use(protectRoutes, checkActive)

ordersRoute.route('/')
  .get(filterOrders, getOrders)
   .post(allowedTo('user'), createOrder);
   

ordersRoute.route('/:id').get(getOrderValidator, getOrder)

ordersRoute.use(allowedTo('manager', 'admin'))
ordersRoute.route('/:id/paid').put(getOrderValidator, isOrderPaid)
ordersRoute.route('/:id/delivered').put(getOrderValidator, isOrderDelivered)

export default ordersRoute;