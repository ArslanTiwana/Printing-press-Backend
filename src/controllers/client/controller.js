const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");

class ClientController {

  static async create(req, res) {
    try {
      const body = req.body
      const existingClient=await dbLayer.getByPhoneNumber(body.phoneNumber)
      if(existingClient){
        return res.json(errorResponse(401, "Client with this Phone Number Already Exist"));
      }
      const client = await dbLayer.create(body)
      if (client) {
        return res.json(successResponse(201, "Client created successfully", client));
      } else {
        return res.json(errorResponse(401, "Client not created"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async update(req, res) {
    const body = req.body
    const {id}=req.params
    try {
      
      const result1 = await dbLayer.findbyid(id);
      if (result1) {
        if(body.phoneNumber){
          const result=await dbLayer.getByPhoneNumber(body.phoneNumber)
          if(result && result.id!=result1.id){
            return res.json(errorResponse(404, "Phone Number You are Using is Already Used By another Client"));
          }
        }
        await dbLayer.update(id,body);
        return res.json(successResponse(200, "Successfull"));
      } else {
        return res.json(errorResponse(404, "No Client found with this id"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async search(req, res) {
    const keyword = req.query.search
    const result =await dbLayer.search(keyword)
    res.send(result);
  }
  static async getAll(req, res) {
    try {
      const result =await dbLayer.getAll()
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getById(req, res) {
    try {
      const {id}=req.params
      const result =await dbLayer.getById(id)
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
            return res.json(successResponse(200, "Successfull", users));
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

module.exports = ClientController;
