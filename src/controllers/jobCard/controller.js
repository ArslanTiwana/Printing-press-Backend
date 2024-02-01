const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require('./database')
const Service = require('./service')
const clientLayer = require("../client/database");
const otherJobsLayer = require("../otherJob/database");

const weddingCardLayer = require("../weddingCard/database");
const offsetLayer = require("../offset/database");
const panaflexLayer = require("../panaflex/database");
const filmLayer = require("../film/database");
const colorPrintLayer = require("../colorPrint/database");
const platesLayer = require("../plates/database");

class UserController {
  static async create(req, res) {
    try {
      let { expectedDeliveryDate, client, plates, panaflex, film, weddingCard, colorPrint, offset,others } = req.body;
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

      const jobCard = await dbLayer.create({ expectedDeliveryDate, clientId, createdBy: req.user.id })
      if (jobCard) {

        if (plates.length != 0) {
          const modifiedBody = Service.modifiedBody(plates, jobCard.id,req.user.id)
          console.log(modifiedBody)
          plates =await platesLayer.createBulk(modifiedBody)
        }
        if (weddingCard.length != 0) {
          const modifiedBody = Service.modifiedBody(weddingCard, jobCard.id,req.user.id)
          weddingCard =await weddingCardLayer.createBulk(modifiedBody)
        }
        if (panaflex.length != 0) {
          const modifiedBody = Service.modifiedBody(panaflex, jobCard.id,req.user.id)
          panaflex =await panaflexLayer.createBulk(modifiedBody)
        }
        if (film.length != 0) {
          const modifiedBody = Service.modifiedBody(film, jobCard.id,req.user.id)
          film = await filmLayer.createBulk(modifiedBody)
        }
        if (offset.length != 0) {
          const modifiedBody = Service.modifiedBody(offset, jobCard.id,req.user.id)
          offset =await offsetLayer.createBulk(modifiedBody)
        }
        if (colorPrint.length != 0) {
          const modifiedBody = Service.modifiedBody(colorPrint, jobCard.id,req.user.id)    
          colorPrint =await colorPrintLayer.createBulk(modifiedBody)
        }
        if (others.length != 0) {
          const modifiedBody = Service.modifiedBody(others, jobCard.id,req.user.id)    
          others =await otherJobsLayer.createBulk(modifiedBody)
        }
      } else {
        return res.json(errorResponse(401, "JobCard Not created"));
      }
      return res.json(successResponse(200, "JobCard Created Sucessfully", {plates,panaflex,weddingCard,colorPrint,film,offset,others}));
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async update(req, res) {
    try {
      const {id}=req.params
      const body=req.body
      const resp=await dbLayer.getById(id)
      if(resp){
      const result =await dbLayer.update(id,body)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    }else{
      return res.json(errorResponse(404, "Not Found"));
    }
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
        const filteredArray = result.map((item) => {
          return {
            name:item.Client?.name,
            email:item.Client?.email,
            phoneNumber:item.Client?.phoneNumber, 
            id:item.id,
            status:item.status,
            invoices:item.Invoices
          };
        });
        return res.json(successResponse(200, "Successfull",filteredArray));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getAllofUser(req, res) {
    try {
      const result = await dbLayer.getAllOfUser(req.user.id)
      if (result) {
        const filteredArray = result.map((item) => {
          return {
            name:item.Client?.name,
            email:item.Client?.email,
            phoneNumber:item.Client?.phoneNumber, 
            id:item.id,
            status:item.status,
            invoices:item.Invoices
          };
        });
        return res.json(successResponse(200, "Successfull",filteredArray));
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
      else{
        return res.json(errorResponse(404, "Not Found",result));

      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async getInvoicejobCardItemsById(req, res) {
    const {id}= req.params;
    try {
      const result = await dbLayer.getInvoicejobCardItemsById(id)
      if (result) {
        console.log(result)
        return res.json(successResponse(200, "Successfull",result));
      }
      else{
        return res.json(errorResponse(404, "Not Found"));

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
