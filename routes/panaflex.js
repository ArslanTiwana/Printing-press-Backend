const express = require('express');
const Panaflex = require('../models/Panaflex');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');

// ROUTE 1: Add Panaflex using: POST "/api/panaflex/addPanaflex". 
router.post('/addPanaflex',  async (req, res) => {
    const panaflexList=req.body
    console.log(panaflexList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        for(let i=0;i<panaflexList.length;i++){
      const panaflex = await Panaflex.create({
        quantity: panaflexList[i].quantity,
        sizeA: panaflexList[i].sizeA,
        sizeB: panaflexList[i].sizeB,
        media: panaflexList[i].media,
        scale: panaflexList[i].scale,
        stick: panaflexList[i].stick,
        folding: panaflexList[i].folding,
        ring: panaflexList[i].ring,
        ringQuantity: panaflexList[i].ringQuantity,
        description:panaflexList[i].description,
        createdAt:Date.now(),
        client:panaflexList[i].clientId, 
      });
    }
      res.json( {succes:true} )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 1: add Panaflex with new Client using: POST "/api/Panaflex/addPanaflexWithNewClient". 
router.post('/addPanaflexWithNewClient',  async (req, res) => {
    const panaflexList=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let checkClient = await Client.findOne({ email: panaflexList[0].email });
        if (checkClient) {
          return res.status(400).json({ error: "Sorry a Client with this email already exists Please Use another Email" })
        }
        const client = await Client.create({
            name: panaflexList[0].name,
            phoneNumber: panaflexList[0].phoneNumber,
            email:panaflexList[0].email, 
          });
        for(let i=0;i<panaflexList.length;i++){
            const panaflex = await Panaflex.create({
                quantity: panaflexList[i].quantity,
                sizeA: panaflexList[i].sizeA,
                sizeB: panaflexList[i].sizeB,
                media: panaflexList[i].media,
                scale: panaflexList[i].scale,
                stick: panaflexList[i].stick,
                folding: panaflexList[i].folding,
                ring: panaflexList[i].ring,
                ringQuantity: panaflexList[i].ringQuantity,
                description:panaflexList[i].description,
                createdAt:Date.now(),
                client:client._id 
              });
    }
      res.json( {succes:true} )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 2: Get All Panaflex Details using: get "/api/panaflex/getAllPanaflex". 
router.get('/getAllPanaflex', async (req, res) => {
    try {
        let allPanaflex=[[]]
      const panaflex = await Panaflex.find()
      for(let i=0;i<panaflex.length;i++){
        allPanaflex[i]={
            "panaflex":panaflex[i],
            "client":await Client.findById(panaflex[i].client)
        }
      }
      res.send(allPanaflex)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 3: Get All Panaflex by Client Details using: POST "/api/panaflex/getAllPanaflexByClient". 
router.post('/getAllPanaflexByClient',async (req, res) => {
    try {

      const panaflex = await Panaflex.find({client:req.body.clientId})
      
      res.send(panaflex)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // ROUTE 4: Update an existing panaflex using: PUT "/api/panaflex/updatePanaflex".
router.put('/updatePanaflex/:id', async (req, res) => {
    const { quantity,sizeA,sizeB,media,scale,stick,folding,ring,ringQuantity,description,clientId,status,paidStatus,cost } = req.body;
    try {
        const newPanaflex = {};
        if (quantity) { newPanaflex.quantity = quantity };
        if (sizeA) { newPanaflex.sizeA= sizeA};
        if (sizeB) { newPanaflex.sizeB = sizeB};
        if (media) { newPanaflex.media = media};
        if (scale) { newPanaflex.scale = scale};
        if (stick) { newPanaflex.stick = stick};
        if (folding) { newPanaflex.folding = folding};
        if (ring) { newPanaflex.ring = ring};
        if (ringQuantity) { newPanaflex.ringQuantity = ringQuantity};
        if (description) { newPanaflex.description = description};
        if (status) { newPanaflex.status = status};
        if (paidStatus) { newPanaflex.paidStatus = paidStatus};
        if (cost) { newPanaflex.cost = cost};
        if (clientId) { newPanaflex.clientId = clientId};

        let panaflex = await Panaflex.findById(req.params.id);
        if (!panaflex) { return res.status(404).send("Not Found") }
        panaflex = await Panaflex.findByIdAndUpdate(req.params.id, { $set: newPanaflex }, { new: true })
        res.json({ panaflex });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })
  // ROUTE 5: Delete an existing Panaflex using: DELETE "/api/panaflex/deletePanaflex". For SellerUI
router.delete('/deletePanaflex/:id', async (req, res) => {
    try {
        let panaflex = await Panaflex.findById(req.params.id);
        if (!panaflex) { return res.status(404).send("Not Found") }

        
        panaflex = await Panaflex.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Panaflex has been deleted", panaflex: panaflex });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
  module.exports = router