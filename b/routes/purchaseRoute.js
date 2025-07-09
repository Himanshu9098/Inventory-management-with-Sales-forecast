import express from 'express';
import Purchase from '../models/purchaseModel.js';
import Product from '../models/productModel.js'
import mongoose from 'mongoose';
const router = express.Router();

// Route for Save a new Purchase
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.product ||
      !request.body.quantity ||
      !request.body.price ||
      !request.body.supplier ||
      !request.body.purchaseDate||
      !request.body.user
    ) {
      return response.status(400).send({
        message: 'Send all required fields: product, quantity, price, supplier, purchaseDate',
      });
    }

    const {user,product,quantity,price,supplier,purchaseDate} =request.body;
    console.log(user,product,quantity,price,supplier,purchaseDate)

    const purchasedProduct =await Product.findById(product);
    
    const oldStock = purchasedProduct.quantityOnHand
    purchasedProduct.quantityOnHand = parseInt(oldStock) + parseInt(quantity);
    const updatedProduct =await Product.findByIdAndUpdate(product,purchasedProduct);
    const totalPurchasePrice = price*quantity;
    const newPurchase = {
      user,
      product:purchasedProduct.name,
      quantity,
      pricePerUnit:price,
      totalPurchasePrice,
      supplier,
      purchaseDate,
    };

    const purchase = await Purchase.create(newPurchase);

    return response.status(201).send(purchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Purchases from the database
router.get('/', async (request, response) => {
  try {
    const {user} = request.query; 
    const filter = user ? { user } : {};

    const purchases = await Purchase.find(filter).sort({ purchaseDate:-1  });
    return response.status(200).json({
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Purchase from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const purchase = await Purchase.findById(id);

    return response.status(200).json(purchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Purchase
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.user ||
      !request.body.product ||
      !request.body.quantity ||
      !request.body.price ||
      !request.body.supplier ||
      !request.body.purchaseDate
    ) {
      return response.status(400).send({
        message: 'Send all required fields: product, quantity, price, supplier, purchaseDate',
      });
    }
    const {user,product,quantity,price,supplier,purchaseDate} =request.body;
    const newPurchase = {
      user,
      product:product.name,
      quantity,
      price,
      supplier,
      purchaseDate,
    };

    const { id } = request.params;

    const result = await Purchase.findByIdAndUpdate(id,newPurchase);

    if (!result) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).send({ message: 'Purchase updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Purchase
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Purchase.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).send({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
