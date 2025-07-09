import mongoose from 'mongoose';

const productSaleSchema = mongoose.Schema({
  product: {
    type:String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
});

const saleSchema = mongoose.Schema(
  {
    user:{
      type:String,
      required:true,
    },
    products: [productSaleSchema],
     // An array of products within the sale
    totalSellingPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;
