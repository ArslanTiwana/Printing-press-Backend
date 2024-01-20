const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");

class ColorPrintController {

  static async getAll(req, res) {
    try {
      const result = dbLayer.getAll()
      if (result) {
        return res.json(successResponse(200, "Successfull",{result}));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getById(req, res) {
    try {
      const result = dbLayer.getById(id)
      if (result) {
        return res.json(successResponse(200, "Successfull",{result}));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

}

module.exports = ColorPrintController;
