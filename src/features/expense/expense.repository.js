import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";



export class ExpenseRepository{

    async add(expenseData){
        try {
            const db = getDb();
            const collection = db.collection("expense");
            return await collection.insertOne(expenseData);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async remove(userId, expenseId){
        try {
            const db = getDb();
            const collection = db.collection("expense");
            const result = await collection.deleteOne({userId:userId,
                _id : new ObjectId(expenseId)
            })
            console.log('Delete ',result);
            return result.deleteCount > 0;
        } catch (error) {
            console.log('Error in getting expense item', error);
        }
    }
    async update(userId, expenseid,updatedfields){
        try {
            const db = getDb();
            const collection = db.collection("expense");
            const currentExpenseValue = collection.findOne({
                _id: new ObjectId(expenseid)
            });
            console.log('Current values')
            const result = await collection.updateOne(
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
            const db = getDb();
            const collection = db.collection("expense");
            const currentExpenseValue = collection.findOne({
                _id: new ObjectId(expenseid)
            });
            console.log('Current values')
            return currentExpenseValue;
        } catch (error) {
            console.log(error);
        }
    }


}