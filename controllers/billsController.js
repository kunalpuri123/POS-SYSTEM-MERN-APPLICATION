const billsModel = require("../models/billsModel");



//add items
const addBillsController = async (req, res) => {
  try {
    const newBills = new billsModel(req.body);
    await newBills.save();
    res.status(201).send("Bill Genrated Successfully!");
  } catch (error) {
    res.send("error", error);
    console.log(error);
  }
};
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {addBillsController,getBillsController
};