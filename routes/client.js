const express = require('express');
const Client = require('../models/Client');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// ROUTE 1: Create a Guest Customer account using: POST "/api/client/addClient". 
router.post('/addClient', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
  ],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let checkClient = await Client.findOne({ email: req.body.email });
        if (checkClient) {
          return res.status(400).json({ error: "Sorry a Client with this email already exists Please Use another Email" })
        }
      const client = await Client.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email:req.body.email, 
      });
      res.json( client )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 2: Get All Client Details using: get "/api/client/getAllClient". 
router.get('/getAllClient', async (req, res) => {
    try {
      const client = await Client.find()
      res.send(client)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })


  // ROUTE 3: Update an existing Client using: PUT "/api/client/updateClient".
router.put('/updateClient/:id', async (req, res) => {
    const { name,phoneNumber,email } = req.body;
    try {
        const newClient = {};
        if (name) { newClient.name = name };
        if (phoneNumber) { newClient.phoneNumber= phoneNumber};
        if (email) { newClient.email = email};
        
        let client = await Client.findById(req.params.id);
        if (!client) { return res.status(404).send("Not Found") }
  
        client = await Client.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true })
        res.json({ client });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })
  // ROUTE 4: Delete an existing Guest Customer using: DELETE "/api/client/deleteClient". For SellerUI
router.delete('/deleteClient/:id', async (req, res) => {
    try {
        let client = await Client.findById(req.params.id);
        if (!client) { return res.status(404).send("Not Found") }
        client = await Client.findByIdAndDelete(req.params.id)
        res.json({ "Success": "client has been deleted", client: client });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
  module.exports = router