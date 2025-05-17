import mongoose from "mongoose";

export const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date:Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            return today;
          }
      },
    category: {type:String, enum:['Groceries','Leisure','Electronics','Utilities',
        'Clothing','Health', 'Others'
    ]}

})



