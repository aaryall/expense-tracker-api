import e from "express";
import { ExpenseModel } from "./expense.model.js";
import { ExpenseRepository } from "./expense.repository.js";
import { ExpenseRepositoryMongoose } from "./expense.repositoryMongoose.js";
export class ExpenseController{

    constructor(){
        this.expenseRepo = new ExpenseRepositoryMongoose();
    }
    async addExpense(req,res){
        try {
            const {title, amount, date, category} = req.body;
            const userId = req.userId;
            console.log('Req userId',req.userId);
            //const newExpense = new ExpenseModel(title, amount, date, category,userId);
            const addedExpense = await this.expenseRepo.add(title, amount, date, category,userId);
            return res.status(201).send(addedExpense);
            
        } catch (error) {
            console.log(error);
        }
    }
    async removeExpense(req,res){
        try {
            const userid = req.userId;
            const expenseid = req.params.expenseid;
            const isRemoved = await this.expenseRepo.remove(userid, expenseid);
            if(!isRemoved){
                res.status(404).send('Item not found');
            }
            else{
                return res.status(200).send('Expense removed successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }
    async updateExpense(req,res){
        try {
            const userid = req.userId;
            const expenseid = req.params.expenseid;
            const toUpdate = req.body;
            const currentExpense = await this.expenseRepo.findByExpenseId(expenseid);
            let updateObj = {}
            //To ensure we have exisiting expense present and we dont do any uneccesary updates
            if(!currentExpense){
                res.status(404).send('Item not found');
                
            }
            else{
                for(let key in currentExpense){
                    if(toUpdate.hasOwnProperty(key)){
                        if(toUpdate[key] != currentExpense[key]){
                            updateObj[key] = toUpdate[key];
                        }
                    }
                }
                //to ensure we always have one or more new fields to update else we will not to unneccessary update
                if(Object.keys(updateObj).length > 0){
                    //
                    const isUpdated = await this.expenseRepo.update(userid, expenseid,updateObj);
                    if(!isUpdated){
                        return res.status(500).send('Something went error');
                    }
                    else{
                        return res.status(200).send('Expenses updated successfully');
                    }
                }
                
                
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }
}