const express = require('express');
const WeddingCard = require('../models/WeddingCard');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');

// ROUTE 1: Add WeddingCard using: POST "/api/weddingCard/addWeddingCard". 
router.post('/addWeddingCard', async (req, res) => {
  const weddingCardList = req.body
  console.log(weddingCardList);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    for (let i = 0; i < weddingCardList.length; i++) {
      const weddingCard = await WeddingCard.create({
        quantity: weddingCardList[i].quantity,
        firm: weddingCardList[i].firm,
        cardColor: weddingCardList[i].cardColor,
        cardNumber: weddingCardList[i].cardNumber,
        mehndi: weddingCardList[i].mehndi,
        baraat: weddingCardList[i].baraat,
        walima: weddingCardList[i].walima,
        printingColor: weddingCardList[i].printingColor,
        description: weddingCardList[i].description,
        createdAt: Date.now(),
        client: weddingCardList[i].clientId,
      });
    }
    res.json({ succes: true })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 1: add weddingCard with new Client using: POST "/api/weddingCard/addWeddingCardWithNewClient". 
router.post('/addWeddingCardWithNewClient', async (req, res) => {
  const weddingCardList = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let checkClient = await Client.findOne({ email: weddingCardList[0].email });
    if (checkClient) {
      return res.status(400).json({ error: "Sorry a Client with this email already exists Please Use another Email" })
    }
    const client = await Client.create({
      name: weddingCardList[0].name,
      phoneNumber: weddingCardList[0].phoneNumber,
      email: weddingCardList[0].email,
    });
    for (let i = 0; i < weddingCardList.length; i++) {
      const weddingCard = await WeddingCard.create({
        quantity: weddingCardList[i].quantity,
        firm: weddingCardList[i].firm,
        cardColor: weddingCardList[i].cardColor,
        cardNumber: weddingCardList[i].cardNumber,
        mehndi: weddingCardList[i].mehndi,
        baraat: weddingCardList[i].baraat,
        walima: weddingCardList[i].walima,
        printingColor: weddingCardList[i].printingColor,
        description: weddingCardList[i].description,
        createdAt: Date.now(),
        client: client._id
      });
    }
    res.json({ succes: true })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 2: Get All weddingCard Details using: get "/api/weddingCard/getAllWeddingCard". 
router.get('/getAllWeddingCard', async (req, res) => {
  try {
    let allWeddingCard = [[]]
    const weddingCard = await WeddingCard.find()
    for (let i = 0; i < weddingCard.length; i++) {
      allWeddingCard[i] = {
        "WeddingCard": weddingCard[i],
        "client": await Client.findById(weddingCard[i].client)
      }
    }
    res.send(allWeddingCard)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 3: Get All WeddingCard by Client Details using: POST "/api/weddingCard/getAllWeddingCardByClient". 
router.post('/getAllWeddingCardByClient', async (req, res) => {
  try {

    const weddingCard = await WeddingCard.find({ client: req.body.clientId })

    res.send(weddingCard)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4: Update an existing weddingCard using: PUT "/api/weddingCard/updateWeddingCard".
router.put('/updateWeddingCard/:id', async (req, res) => {
  const { quantity,firm,cardColor,cardNumber,printingColor,mehndi,baraat,walima, description, clientId, status, paidStatus, cost } = req.body;
  try {
    const newWeddingCard = {};
    if (quantity) { newWeddingCard.quantity = quantity };
    if (firm) { newWeddingCard.firm = firm };
    if (cardColor) { newWeddingCard.cardColor = cardColor };
    if (cardNumber) { newWeddingCard.cardNumber = cardNumber };
    if (printingColor) { newWeddingCard.printingColor = printingColor };
    if (mehndi) { newWeddingCard.mehndi = mehndi };
    if (baraat) { newWeddingCard.baraat = baraat };
    if (walima) { newWeddingCard.walima = walima };
    if (description) { newWeddingCard.description = description };
    if (status) { newWeddingCard.status = status };
    if (paidStatus) { newWeddingCard.paidStatus = paidStatus };
    if (cost) { newWeddingCard.cost = cost };
    if (clientId) { newWeddingCard.clientId = clientId };

    let weddingCard = await WeddingCard.findById(req.params.id);
    if (!weddingCard) { return res.status(404).send("Not Found") }
    weddingCard = await WeddingCard.findByIdAndUpdate(req.params.id, { $set: newWeddingCard }, { new: true })
    res.json({ weddingCard });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 5: Delete an existing weddingCard using: DELETE "/api/weddingCard/deleteWeddingCard". For SellerUI
router.delete('/deleteWeddingCard/:id', async (req, res) => {
  try {
    let weddingCard = await WeddingCard.findById(req.params.id);
    if (!weddingCard) { return res.status(404).send("Not Found") }
    weddingCard = await WeddingCard.findByIdAndDelete(req.params.id)
    res.json({ "Success": "WeddingCard has been deleted", weddingCard: weddingCard });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router