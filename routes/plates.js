const express = require('express');
const Plates = require('../models/Plates');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');

// ROUTE 1: Add Plate using: POST "/api/plates/addPlates". 
router.post('/addPlates',  async (req, res) => {
    const platesList=req.body
    console.log(platesList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        for(let i=0;i<platesList.length;i++){
      const plates = await Plates.create({
        quantity: platesList[i].quantity,
        size: platesList[i].size,
        color:platesList[i].color,
        description:platesList[i].description,
        createdAt:Date.now(),
        client:platesList[i].clientId, 
      });
    }
      res.json( {succes:true} )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 1: add Plate with new Client using: POST "/api/plates/addPlatesWithNewClient". 
router.post('/addPlatesWithNewClient',  async (req, res) => {
    const platesList=req.body
    console.log(platesList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let checkClient = await Client.findOne({ email: platesList[0].email });
        if (checkClient) {
          return res.status(400).json({ error: "Sorry a Client with this email already exists Please Use another Email" })
        }
        const client = await Client.create({
            name: platesList[0].name,
            phoneNumber: platesList[0].phoneNumber,
            email:platesList[0].email, 
          });
        for(let i=0;i<platesList.length;i++){
      const plates = await Plates.create({
        quantity: platesList[i].quantity,
        size: platesList[i].size,
        color:platesList[i].color,
        description:platesList[i].description,
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
// ROUTE 2: Get All plates Details using: get "/api/plates/getAllPlates". 
router.get('/getAllPlates', async (req, res) => {
    try {
        let allPlates=[[]]
      const plates = await Plates.find()
      for(let i=0;i<plates.length;i++){
        allPlates[i]={
            "plate":plates[i],
            "client":await Client.findById(plates[i].client)
        }
      }
      res.send(allPlates)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 3: Get All Plates by Client Details using: POST "/api/plates/getAllPlatesByClient". 
router.post('/getAllPlatesByClient',async (req, res) => {
    try {

      const plates = await Plates.find({client:req.body.clientId})
      
      res.send(plates)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // ROUTE 4: Update an existing plates using: PUT "/api/plates/updatePlates".
router.put('/updatePlates/:id', async (req, res) => {
    const { quantity,color,size,description,clientId,status,paidStatus,cost } = req.body;
    try {
        const newPlates = {};
        if (quantity) { newPlates.quantity = quantity };
        if (color) { newPlates.color= color};
        if (size) { newPlates.size = size};
        if (description) { newPlates.description = description};
        if (status) { newPlates.status = status};
        if (paidStatus) { newPlates.paidStatus = paidStatus};
        if (cost) { newPlates.cost = cost};
        if (clientId) { newPlates.clientId = clientId};

        let plates = await Plates.findById(req.params.id);
        if (!plates) { return res.status(404).send("Not Found") }
  
        plates = await Plates.findByIdAndUpdate(req.params.id, { $set: newPlates }, { new: true })
        res.json({ plates });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })
  // ROUTE 5: Delete an existing plates using: DELETE "/api/plates/deletePlates". For SellerUI
router.delete('/deletePlates/:id', async (req, res) => {
    try {
        let plates = await Plates.findById(req.params.id);
        if (!plates) { return res.status(404).send("Not Found") }

        
        plates = await Plates.findByIdAndDelete(req.params.id)
        res.json({ "Success": "plate has been deleted", plates: plates });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
  module.exports = router