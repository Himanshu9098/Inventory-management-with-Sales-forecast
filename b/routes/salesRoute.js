import express from 'express';
import Sale from '../models/saleModel.js';
import Product from '../models/productModel.js'

const router = express.Router();

// Create a new sale
router.post('/', async (req, res) => {
  try {
    const {user, products, customer, saleDate } = req.body;
    console.log(user, products, customer, saleDate)
    // Assuming you have the product and sale objects
const saleItems = []; // An array of product sale items

// Loop through the products you want to include in the sale
for (const product of products) {
  // Fetch the product details from your database
  const productDetails = await Product.findById(product.product);
 
  const price = productDetails.price * product.quantity;
  //sales and stock update
  const oldsale =productDetails.sales;
  const oldStock = productDetails.quantityOnHand
  if((parseInt(oldStock)<parseInt(product.quantity)) || parseInt(product.quantity) === 0){
    res.status(500).send({message:'Internal Server error'});
  }
  productDetails.sales= parseInt(product.quantity) + parseInt(oldsale) ;
  productDetails.quantityOnHand= oldStock - product.quantity ;

  const sale = await Product.findByIdAndUpdate({_id:product.product},productDetails)
  // Calculate the price for the product sale item


  // Create a product sale item object
  const productSaleItem = {
    product: productDetails.name,
    quantity: product.quantity,
    price: price,
  };

  // Add the product sale item to the array
  saleItems.push(productSaleItem);
}

// Calculate the total selling price
const totalSellingPrice = saleItems.reduce((total, item) => total + item.price, 0);

// Create a new sale with the calculated values
const newSale = new Sale({
  user:user,
  products: saleItems,
  totalSellingPrice: totalSellingPrice,
  customer:customer,
  saleDate: saleDate,
});

// Save the sale to the database
const createSale = await Sale.create(newSale);
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message });
  }
});

// Route for Get All sales for a user
router.get('/', async (request, response) => {
  try {
    const {user} = request.query; 
    const filter = user ? { user } : {};

    const sales = await Sale.find(filter).sort({saleDate:-1});
    return response.status(200).json({
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get a single sale by ID
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a sale by ID
router.put('/:id', async (req, res) => {
  try {
    const { user,products, customer, saleDate } = req.body;

    // Calculate totalSellingPrice by summing up prices from products
    const totalSellingPrice = products.reduce((total, product) => total + product.price, 0);

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      {
        user,
        products,
        totalSellingPrice,
        customer,
        saleDate,
      },
      { new: true } // Returns the updated sale
    );

    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a sale by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
