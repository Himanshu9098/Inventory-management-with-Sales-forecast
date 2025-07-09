// purchaseModel.js
import mongoose from 'mongoose';

const purchaseSchema = mongoose.Schema(
  {
    user:{
      type:String,
      required:true,
    },
    supplier:{
      type:String,
      required:true,
    },
    product: {
      type:String,
      required:true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    totalPurchasePrice:{
      type:Number,
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;