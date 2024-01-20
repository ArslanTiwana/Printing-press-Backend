const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");

class ColorPrintController {

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

}

module.exports = ColorPrintController;
