import { ExpenseController } from "./expense.controller.js";
import express from "express";

const expenseRoute = express.Router();

const expenseController = new ExpenseController();

expenseRoute.delete('/:expenseid',(req,res)=>{
    expenseController.removeExpense(req,res);
})
expenseRoute.post('/update/:expenseid',(req,res)=>{
    expenseController.updateExpense(req,res);
})
expenseRoute.get('/filter',(req,res)=>{
    expenseController.filterExpense(req,res);
})
expenseRoute.post('/add',(req,res)=>{
    expenseController.addExpense(req,res);
})




export default expenseRoute;
