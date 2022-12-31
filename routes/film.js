const express = require('express');
const Film = require('../models/Film');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');

// ROUTE 1: Add Film using: POST "/api/film/addFilm". 
router.post('/addFilm',  async (req, res) => {
    const filmList=req.body
    console.log(filmList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        for(let i=0;i<filmList.length;i++){
      const film = await Film.create({
        quantity: filmList[i].quantity,
        sizeA: filmList[i].sizeA,
        sizeB: filmList[i].sizeB,
        color:filmList[i].color,
        description:filmList[i].description,
        createdAt:Date.now(),
        client:filmList[i].clientId, 
      });
    }
      res.json( {succes:true} )
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 1: add Film with new Client using: POST "/api/film/addFilmWithNewClient". 
router.post('/addFilmWithNewClient',  async (req, res) => {
    const filmList=req.body
    console.log(filmList);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let checkClient = await Client.findOne({ email: filmList[0].email });
        if (checkClient) {
          return res.status(400).json({ error: "Sorry a Client with this email already exists Please Use another Email" })
        }
        const client = await Client.create({
            name: filmList[0].name,
            phoneNumber: filmList[0].phoneNumber,
            email:filmList[0].email, 
          });
        for(let i=0;i<filmList.length;i++){
      const film = await Film.create({
        quantity: filmList[i].quantity,
        sizeA: filmList[i].sizeA,
        sizeB: filmList[i].sizeB,
        color:filmList[i].color,
        description:filmList[i].description,
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
// ROUTE 2: Get All film Details using: get "/api/film/getAllFilm". 
router.get('/getAllFilm', async (req, res) => {
    try {
        let allFilm=[[]]
      const film = await Film.find()
      for(let i=0;i<film.length;i++){
        allFilm[i]={
            "film":film[i],
            "client":await Client.findById(film[i].client)
        }
      }
      res.send(allFilm)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// ROUTE 3: Get All Film by Client Details using: POST "/api/film/getAllFilmByClient". 
router.post('/getAllFilmByClient',async (req, res) => {
    try {

      const film = await Film.find({client:req.body.clientId})
      
      res.send(film)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // ROUTE 4: Update an existing Film using: PUT "/api/film/updateFilm".
router.put('/updateFilm/:id', async (req, res) => {
    const { quantity,color,sizeA,sizeB,description,clientId,status,paidStatus,cost } = req.body;
    try {
        const newFilm = {};
        if (quantity) { newFilm.quantity = quantity };
        if (color) { newFilm.color= color};
        if (sizeA) { newFilm.sizeA = sizeA};
        if (sizeB) { newFilm.sizeB = sizeB};
        if (description) { newFilm.description = description};
        if (status) { newFilm.status = status};
        if (paidStatus) { newFilm.paidStatus = paidStatus};
        if (cost) { newFilm.cost = cost};
        if (clientId) { newFilm.clientId = clientId};

        let film = await Film.findById(req.params.id);
        if (!film) { return res.status(404).send("Not Found") }
  
        film = await Film.findByIdAndUpdate(req.params.id, { $set: newFilm }, { new: true })
        res.json({ film });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })
  // ROUTE 5: Delete an existing film using: DELETE "/api/film/deleteFilm". For SellerUI
router.delete('/deleteFilm/:id', async (req, res) => {
    try {
        let film = await Film.findById(req.params.id);
        if (!film) { return res.status(404).send("Not Found") }

        
        film = await Film.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Film has been deleted", film: film });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
  module.exports = router