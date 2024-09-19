import ordersModel from "../models/ordersModel";
import { Orders } from "../interfaces/orders";
import { getAll, getOne } from "./refactorHandler";
import { NextFunction, Request, Response } from 'express';
import { FilterData } from "../interfaces/filterData";
import asyncHandler from 'express-async-handler';
import cartsModel from "../models/cartsModel";
import ApiErrors from "../utils/apiErrors";
import { CartProducts } from "../interfaces/carts";
import productsModel from "../models/productsModel";

// filterOrders
export const filterOrders = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role === 'user') {
    const filterData: FilterData = { user: req.user._id };
    req.filterData = filterData;
  }
  next();
};

// get all orders
export const getOrders = getAll<Orders>(ordersModel, 'orders')

// get one order
export const getOrder = getOne<Orders>(ordersModel)


// create order
export const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // 0 tax price
  const taxPrice: number = 100;
  // 1 Get user cart
  const cart = await cartsModel.findOne({ user: req.user?._id });
  if (!cart) { return next(new ApiErrors('cart not found', 404)) };
  // 2 get order price
  const cartPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  const totalOrderPrice: number = cartPrice + taxPrice;
  // 3 create order
  const order: Orders = await ordersModel.create({
    user: req.user?._id,
    totalPrice: totalOrderPrice,
    // address: req.body.address || 'Mansoura, Egypt',
    cartItems: cart.cartItems,
    taxPrice
  })
  // 4 delete cart, update product quantity and sold
  if (order) {
    const bulkOption = cart.cartItems.map((item: CartProducts) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
      }
    }))
    await productsModel.bulkWrite(bulkOption);
    await cartsModel.findByIdAndDelete(cart._id);
  }
  res.status(201).json({ data: order })
});

// update order [isPaid, isDelivered]
export const isOrderPaid = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const order = await ordersModel.findById(req.params.id);
  // if (!order) { return next(new ApiErrors('order not found', 404)) };
  // order.isPaid = true;
  // order.paidAt = Date.now();
  // const updatedOrder = await order.save();
  const order = await ordersModel.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now()
  }, { new: true })
  if (!order) { return next(new ApiErrors('order not found', 404)) };
  res.status(200).json({ data: order })
});

export const isOrderDelivered = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const order = await ordersModel.findById(req.params.id);
  // if (!order) { return next(new ApiErrors('order not found', 404)) };
  // order.isDelivered = true;
  // order.deliveredAt = Date.now();
  // const updatedOrder = await order.save();
  const order = await ordersModel.findByIdAndUpdate(req.params.id, {
    isDelivered: true,
    deliveredAt: Date.now()
  }, { new: true })
  if (!order) { return next(new ApiErrors('order not found', 404)) };
  res.status(200).json({ data: order })
});