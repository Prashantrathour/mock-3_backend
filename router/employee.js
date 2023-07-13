const express = require("express");
const { employee } = require("../model/usermodel");


const employeeRouter = express.Router();

require("dotenv").config();
employeeRouter.post("/add", async (req, res) => {
  try {
    const product = new employee(req.body);
    const saved = await product.save();

    res.json(saved);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
employeeRouter.delete("/delete/:id", async (req, res) => {
    const id=req.params.id
    if(id){

        try {
          const deleteemployee=await employee.findByIdAndDelete(id);
          res.status(202).json({ message: "employee Deleted"});
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
    }else{
        res.status(404).json({ message: "invailed id" }); 
    }
});
employeeRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
  
    if (id) {
      try {
        const updateemployee = await employee.findByIdAndUpdate(id, req.body, {
          new: true,
        });
  
        if (!updateemployee) {
          return res.status(404).json({ message: "Employee not found" });
        }
  
        res.status(200).json(updateemployee);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "Invalid ID" });
    }
  });
  
  employeeRouter.get("/sort/salary/:order", async (req, res) => {
    const { order } = req.params;
  
    try {
      let sortedEmployees;
  
      if (order === "asc") {
        sortedEmployees = await employee.find().sort({ salary: 1 });
      } else if (order === "desc") {
        sortedEmployees = await employee.find().sort({ salary: -1 });
      } else {
        return res.status(400).json({ message: "Invalid order parameter" });
      }
  
      res.status(200).json(sortedEmployees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  employeeRouter.get("/search/:firstName", async (req, res) => {
    const { firstName } = req.params;
  
    try {
      const employees = await employee.find({ firstName: { $regex: firstName, $options: "i" } });
  
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
employeeRouter.get("/", async (req, res) => {
  if (req._parsedUrl.query) {
    if (req.query.page || req.query.limit) {
      console.log(req.query)
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skip = (page - 1) * limit;
      try {
        const data = await employee.find().skip(skip).limit(limit);
        res.json(data);
      } catch (error) {
        res.status(404).json({ error: error });
      }
    }
  } else {
    try {
      const product = await employee.find();
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
});

module.exports = employeeRouter;
