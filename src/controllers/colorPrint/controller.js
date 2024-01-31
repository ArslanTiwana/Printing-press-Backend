const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");

class ColorPrintController {

  static async create(req, res) {
    try {
      const body=req.body
      const result =await dbLayer.create(body)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
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
      return res.json(errorResponse(404, "No Found"));
    }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
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
  static async getAllPending(req, res) {
    try {
      const result =await dbLayer.getAllPending(req.user.id)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
      else{
        return res.json(successResponse(200, "Not Found",{}));
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

module.exports = ColorPrintController;
