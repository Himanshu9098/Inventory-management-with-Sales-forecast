import express from 'express';
import Product from '../models/productModel.js';
const router = express.Router();


// Function to generate SKU from the product name
function generateSKU(name) {
  // Remove spaces and convert to lowercase
  const cleanedName = name.replace(/\s/g, '').toLowerCase();
  // Generate a random number (you can replace this with your own logic)
  const randomPart = Math.floor(Math.random() * 1000);
  return cleanedName + randomPart;
}

// Route for Save a new Product
router.post('/', async (request, response) => {
  try {
    // Validate that required fields are present
    const { user, name, description, price, quantityOnHand, sales, categories } = request.body;
    console.log(user, name, description, price, quantityOnHand, sales, categories)
    
    
    
    // if (!user || !name || !description || !price || !quantityOnHand || !sales) {
    //   return response.status(400).send({
    //     message: 'Send all required fields: user, name, description, price, quantityOnHand, sales',
    //   });
    // }



    // Create a new product
    const newProduct = {
      user,
      name,
      sales,
      description,
      SKU: generateSKU(name),
      price,
      quantityOnHand,
      categories, // Include categories in the new product
    };

    const product = await Product.create(newProduct);

    return response.status(201).send(product);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});



// Route for Update a Product
router.put('/:id', async (request, response) => {
  try {
    // Validate that required fields are present
    const { name, description, price, quantityOnHand, user ,sales, categories} = request.body;
    if (!user || !name || !description || !price || !quantityOnHand) {
      return response.status(400).send({
        message: 'Send all required fields: user, name, description, price, quantityOnHand',
      });
    }

    const { id } = request.params;


    // Create an object for the update, excluding the user field (assuming it should not be updated)
    const updateProduct = {
      name,
      type: request.body.type || 'product',
      description,
      SKU: generateSKU(name),
      price,
      quantityOnHand,
      categories, // Include categories in the updated product
      sales,
    };

    const result = await Product.findByIdAndUpdate(id, updateProduct);

    if (!result) {
      return response.status(404).json({ message: 'Product not found' });
    }

    return response.status(200).send({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Get All Purchases from the database
router.get('/', async (request, response) => {
  try {
    const {user} = request.query; 
    const filter = user ? { user } : {};

    const products = await Product.find(filter);
    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Get One Product from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const product = await Product.findById(id);
    return response.status(200).json(product);
  } catch (error){
    console.log (error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Product
router.put('/:id', async (request, response) => {
  try {
    // Validate that required fields are present
    const { name, description, price, quantityOnHand, user } = request.body;
    if (!user || !name || !description || !price || !quantityOnHand) {
      return response.status(400).send({
        message: 'Send all required fields: user, name, description, price, quantityOnHand',
      });
    }

    const { id } = request.params;

    // Create an object for the update, excluding the user field (assuming it should not be updated)
    const updateProduct = {
      name,
      type: request.body.type || 'product',
      description,
      SKU: generateSKU(name),
      price,
      quantityOnHand,
      categories: request.body.categories || [],
    sales:request.body.sales ||0,
    };

    const result = await Product.findByIdAndUpdate(id, updateProduct);

    if (!result) {
      return response.status(404).json({ message: 'Product not found' });
    }

    return response.status(200).send({ message: 'Product updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Product
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Product not found' });
    }

    return response.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});




export default router;
