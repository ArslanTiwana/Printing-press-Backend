const {
  successResponse,
  errorResponse,
} = require("../../utils/response/response");
const dbLayer = require("./database");

class PlatesController {
  static async create(req, res) {
    try {
      const body = req.body;
      const result = await dbLayer.create(body);
      if (result) {
        return res.json(successResponse(200, "Successfull", result));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const resp = await dbLayer.getById(id);
      if (resp) {
        const result = await dbLayer.update(id, body);
        if (result) {
          return res.json(successResponse(200, "Successfull", result));
        }
      } else {
        return res.json(errorResponse(404, "No Found"));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async updateScrumboard(req, res) {
    try {
      const { id } = req.params;
      const { updateBody, ordered } = req.body;
      const resp = await dbLayer.getById(id);
      if (resp) {
        const result = await dbLayer.update(id, updateBody);
        if (result) {
          const unordered = await dbLayer.getAllForScrumBoard();
          let data = [];
          data.push(ordered.Completed.map((item) => item));
          data.push(ordered.Pending.map((item) => item));
          data.push(ordered.Processing.map((item) => item));
          console.log(data);

          return res.json(successResponse(200, "Successfull", data));
        }
      } else {
        return res.json(errorResponse(404, "No Found"));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getAll(req, res) {
    try {
      const result = await dbLayer.getAll();
      if (result) {
        return res.json(successResponse(200, "Successfull", result));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getAllForScrumBoard(req, res) {
    try {
      const result = await dbLayer.getAllForScrumBoard();
      if (result) {
        return res.json(successResponse(200, "Successfull", result));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await dbLayer.getById(id);
      if (result) {
        return res.json(successResponse(200, "Successfull", result));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await dbLayer.getById(id);
      if (result) {
        await dbLayer.delete(id);
        return res.json(successResponse(200, "Successfull", result));
      } else {
        return res.json(errorResponse(404, " Not Found"));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = PlatesController;
