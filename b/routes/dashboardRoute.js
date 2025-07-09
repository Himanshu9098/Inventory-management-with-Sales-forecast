import express from "express";
import Sale from "../models/saleModel.js";
import Purchase from '../models/purchaseModel.js'
import Product from '../models/productModel.js'
const router = express.Router();

router.get("/sales", async (request, response) => {
  const {user} = request.query; 
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  try {
    // Calculate the date 30 days ago from today

    const result = await Sale.aggregate([
      {
        $match: {
          user: user, // Filter documents for the specified user
          saleDate: { $gte: thirtyDaysAgo }, // Filter for dates in the last 30 days
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
          total_sales: { $sum: "$totalSellingPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          Date: "$_id",
          Sales: "$total_sales",
        },
      },
    ]);
  return response.status(201).json(result);
  } catch (error) {
    response.status(500).send("Internal Server error");
    console.error(error);
  }
});

router.get("/totalrevenue", async (request, response) => {
  const {user} = request.query; 
  
try{
  const result = await Sale.aggregate([
    {
      $match: {
        user: user, // Filter documents for the specified user 
      },
    },

    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalSellingPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalSales: 1,
      },
    },
  ]);

return response.status(201).json(result);
} catch (error) {
  response.status(500).send("Internal Server error");
  console.error(error);
}

});

router.get("/totalexpense", async (request, response) => {
  const {user} = request.query; 
try{
  const result = await Purchase.aggregate([
    {
      $match: {
        user: user, // Filter documents for the specified user
      },
    },

    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$totalPurchasePrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalExpenses: 1,
      },
    },
  ]);

 return response.status(201).json(result);
} catch (error) {
  response.status(500).send("Internal Server error");
  console.error(error);
}

});



router.get("/topproducts/:user", async (request, response) => {
  const userId = request.params.user;
try{
  const result = await  Product.find({'user':userId})
  .sort({ sales: -1 }) // Sort by sales in descending order
  .limit(3)

 return response.status(201).json(result);
} catch (error) {
  response.status(500).send("Internal Server error");
  console.error(error);
}

});

router.get('/RP/:user', async (request, response) => {
  try {
    const user = request.params.user; 
    const filter = user ? { user } : {};

    const purchases = await Purchase.find(filter).sort({ purchaseDate:-1  }).limit(5);
    return response.status(200).json(purchases);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.get('/RS/:user', async (request, response) => {
  try {
    const user = request.params.user; 
    const filter = user ? { user } : {};

    const sales = await Sale.find(filter).sort({ saleDate:-1  }).limit(5);
    return response.status(200).json(sales);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;
