import mongoose from "mongoose";
import { expenseSchema } from "./expense.schema.js";

//Create model from Schema = collection
const ExpenseModel = mongoose.model('expense',expenseSchema);
const ObjectId = mongoose.Types.ObjectId;
export class ExpenseRepositoryMongoose{
     async add(title, amount, date, category,userId){
            try {
                const newExpense = new ExpenseModel({
                    title: title,
                    amount: amount,
                    date:date,
                    category:category,
                    userId: new ObjectId(userId)

                });
                return await newExpense.save();
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
        async remove(userId, expenseId){
            try {
                const result = await ExpenseModel.deleteOne({userId:userId,
                    _id : new ObjectId(expenseId)
                })
                console.log('Delete ',result);
                return result.deletedCount > 0;
            } catch (error) {
                console.log('Error in getting expense item', error);
            }
        }
        async update(userId, expenseid,updatedfields){
            try {
                // const currentExpenseValue = ExpenseModel.find({
                //     _id: new ObjectId(expenseid)
                // });
                // console.log('Current values')
                const result = await ExpenseModel.updateOne(
                    {_id: new ObjectId(expenseid),
                        userId:userId
                    },
                    { $set: updatedfields}
                );
                return result.modifiedCount >0;
                
            } catch (error) {
                console.log(error);
            }
        }
        async findByExpenseId(expenseid){
            try {
                const currentExpenseValue = await ExpenseModel.find({
                    _id: new ObjectId(expenseid)
                });
                console.log('Current values',currentExpenseValue)
                return currentExpenseValue;
            } catch (error) {
                console.log(error);
            }
        }
        async filterByDate(startDate, endDate, userId){
            try { //userId: 0, __v:0 , createdAt: 0 
                const filteredData = await ExpenseModel.find().where("date").equals(userId).gte(startDate)
                                                        .lte(endDate).select({ date: 1})
                                                        .sort("date")
                                                        .limit(10);
                // console.log(filteredData);
                return filteredData;
                
            } catch (error) {
                console.log(error)
            }
        }
    
    
}


