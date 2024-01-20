const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");

class ClientController {

  static async create(req, res) {
    try {
      const body = req.body
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
    const id=req.params
    try {
      const result = await dbLayer.findbyid(id);
      if (result) {
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
    const result = dbLayer.search(keyword)
    res.send(result);
  }
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
    res.send(users);
  }
}

module.exports = ClientController;
