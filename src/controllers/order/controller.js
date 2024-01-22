const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require('./database')
const Service = require('./service')
const clientLayer = require("../client/database");

const weddingCardLayer = require("../weddingCard/database");
const offsetLayer = require("../offset/database");
const panaflexLayer = require("../panaflex/database");
const filmLayer = require("../film/database");
const colorPrintLayer = require("../colorPrint/database");
const platesLayer = require("../plates/database");

class UserController {
  static async create(req, res) {
    try {
      const { expectedDeliveryDate, client, plates, panaflex, film, weddingCard, colorPrint, offset } = req.body;
      let clientId;
      if (client.id) {
        clientId = client.id
      }
      else {
        const existingClient=await clientLayer.getByPhoneNumber(client.phoneNumber)
        if(!existingClient){
        const newClient = await clientLayer.create(client)
        clientId = newClient.id
        }else{
          return res.json(errorResponse(401, "Client with this Phone Number Already Exist"));
        }
      }
      const order = await dbLayer.create({ expectedDeliveryDate, clientId, createdBy: req.user.id })
      if (order) {
        if (plates.length != 0) {
          const modifiedBody = Service.modifiedBody(plates, order.id)
          console.log(modifiedBody)
          await platesLayer.createBulk(modifiedBody)
        }
        if (weddingCard.length != 0) {
          const modifiedBody = Service.modifiedBody(weddingCard, order.id)
          await weddingCardLayer.createBulk(modifiedBody)
        }
        if (panaflex.length != 0) {
          const modifiedBody = Service.modifiedBody(panaflex, order.id)
          await panaflexLayer.createBulk(modifiedBody)
        }
        if (film.length != 0) {
          const modifiedBody = Service.modifiedBody(film, order.id)
          await filmLayer.createBulk(modifiedBody)
        }
        if (offset.length != 0) {
          const modifiedBody = Service.modifiedBody(offset, order.id)
          await offsetLayer.createBulk(modifiedBody)
        }
        if (colorPrint.length != 0) {
          const modifiedBody = Service.modifiedBody(colorPrint, order.id)
          await colorPrintLayer.createBulk(modifiedBody)
        }
      } else {
        return res.json(errorResponse(401, "Order Not created"));
      }
      return res.json(successResponse(200, "Order Created Sucessfully", order));
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getAll(req, res) {
    try {
      const result = await dbLayer.getAll()
      console.log(result)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getById(req, res) {
    const {id}= req.params;
    try {
      const result = await dbLayer.getDetailsById(id)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async getByClient(req, res) {
    const {id}= req.params;
    try {
      const result = await dbLayer.getByClient(id)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async delete(req, res) {
    try {
      const {id}=req.params
      
        const result = await dbLayer.getById(id)
        if (result) {
            await dbLayer.delete(id)
            return res.json(successResponse(200, "Successfull", result));
          } 
        else {
          return res.json(errorResponse(404, " Not Found"));
        }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = UserController;
