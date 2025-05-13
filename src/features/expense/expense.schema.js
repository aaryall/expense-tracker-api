import mongoose from "mongoose";

export const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category: {type:String, enum:['Groceries','Leisure','Electronics','Utilities',
        'Clothing','Health', 'Others'
    ]}

})



