const express = require('express');
const ColorPrint = require('../models/ColorPrint');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');

// ROUTE 1: Add ColorPrint using: POST "/api/colorPrint/addColorPrint". 
router.post('/addColorPrint',  async (req, res) => {
    const colorPrintList=req.body
    console.log(colorPrintList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        for(let i=0;i<colorPrintList.length;i++){
      const colorPrint = await ColorPrint.create({
        quantity: colorPrintList[i].quantity,
        size: colorPrintList[i].size,
        paperType:colorPrintList[i].paperType,
        description:colorPrintList[i].description,
        createdAt:Date.now(),
        client:colorPrintList[i].clientId, 
      });
    }
      res.json( {succes:true} )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 1: add Color Print with new Client using: POST "/api/colorPrint/addColorPrintWithNewClient". 
router.post('/addColorPrintWithNewClient',  async (req, res) => {
    const colorPrintList=req.body
    console.log(colorPrintList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let checkClient = await Client.findOne({ email: colorPrintList[0].email });
        if (checkClient) {
          return res.status(400).json({ error: "Sorry a Client with this email already exists Please Use another Email" })
        }
        const client = await Client.create({
            name: colorPrintList[0].name,
            phoneNumber: colorPrintList[0].phoneNumber,
            email:colorPrintList[0].email, 
          });
        for(let i=0;i<colorPrintList.length;i++){
      const colorPrint = await ColorPrint.create({
        quantity: colorPrintList[i].quantity,
        size: colorPrintList[i].size,
        paperType:colorPrintList[i].paperType,
        description:colorPrintList[i].description,
        createdAt:Date.now(),
        client:client._id, 
      });
    }
      res.json( {succes:true} )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 2: Get All colorPrint Details using: get "/api/colorPrint/getAllColorPrint". 
router.get('/getAllColorPrint', async (req, res) => {
    try {
        let allColorPrint=[[]]
      const colorPrint = await ColorPrint.find()
      for(let i=0;i<colorPrint.length;i++){
        allColorPrint[i]={
            "colorPrint":colorPrint[i],
            "client":await Client.findById(colorPrint[i].client)
        }
      }
      res.send(allColorPrint)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 3: Get All ColorPrint by Client Details using: POST "/api/colorPrint/getAllColorPrintByClient". 
router.post('/getAllColorPrintByClient',async (req, res) => {
    try {

      const colorPrint = await ColorPrint.find({client:req.body.clientId})
      
      res.send(colorPrint)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // ROUTE 4: Update an existing ColorPrint using: PUT "/api/colorPrint/updateColorPrint".
router.put('/updateColorPrint/:id', async (req, res) => {
    const { quantity,paperType,size,description,clientId,status,paidStatus,cost } = req.body;
    try {
        const newColorPrint = {};
        if (quantity) { newColorPrint.quantity = quantity };
        if (paperType) { newColorPrint.paperType= paperType};
        if (size) { newColorPrint.size = size};
        if (description) { newColorPrint.description = description};
        if (status) { newColorPrint.status = status};
        if (paidStatus) { newColorPrint.paidStatus = paidStatus};
        if (cost) { newColorPrint.cost = cost};
        if (clientId) { newColorPrint.clientId = clientId};

        let colorPrint = await ColorPrint.findById(req.params.id);
        if (!colorPrint) { return res.status(404).send("Not Found") }
  
        colorPrint = await ColorPrint.findByIdAndUpdate(req.params.id, { $set: newColorPrint }, { new: true })
        res.json({ colorPrint });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })
  // ROUTE 5: Delete an existing ColorPrint using: DELETE "/api/colorPrint/deleteColorPrint". 
router.delete('/deleteColorPrint/:id', async (req, res) => {
    try {
        let colorPrint = await ColorPrint.findById(req.params.id);
        if (!colorPrint) { return res.status(404).send("Not Found") }

        
        colorPrint = await ColorPrint.findByIdAndDelete(req.params.id)
        res.json({ "Success": "plate has been deleted", colorPrint: colorPrint });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
  module.exports = router