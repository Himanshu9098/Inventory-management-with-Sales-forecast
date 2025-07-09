import express from 'express';
import Sale from '../models/saleModel.js';
const router = express.Router();
import { parse as json2csv } from 'json2csv';

router.get('/:user',async(request,response)=>{


  const userId = request.params.user;
  console.log(userId)

  const result = await Sale.aggregate([
    {
      $match: {
        user: userId, // Filter documents for the specified user
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%d-%m-%Y', date: '$saleDate' } },
        total_sales: { $sum: '$totalSellingPrice' }
      }
    },
    {
      $project: {
        _id: 0,
        Date: '$_id',
        Sales: '$total_sales'
      }
    },
    {
      $sort: {
        Date: 1 // 1 for ascending order, -1 for descending order
      }
    }
  ]);
  
      
  
    const csv = json2csv(result);
    
      response.setHeader('Content-Type', 'text/csv');
      response.setHeader('Content-Disposition', 'attachment; filename=sales.csv');
      response.send(csv);
    
})

export default router;