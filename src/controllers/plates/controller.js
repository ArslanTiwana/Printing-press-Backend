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
  static async getAllPending(req, res) {
    try {
      const result = await dbLayer.getAllPending(req.user.id)
      if (result) {
        return res.json(successResponse(200, "Successfull", result));
      }
      else {
        return res.json(successResponse(200, "Not Found", {}));
      }
    } catch (error) {
      console.log(error)
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
  static async statusChange(req, res) {
    try {
      const { id } = req.params;
      const resp = await dbLayer.getById(id);
      if (resp) {
        const response= await dbLayer.getAllProcessing()
        if(response.length>0){
          response.map(async (item)=>await dbLayer.update(item.id,{sortNo:item.sortNo+1}))
        }
        const result = await dbLayer.update(id, {status:"Processing",sortNo:0});
        if (result) {
          return res.json(successResponse(200, "Successfull", result));
        }
      } else {
        return res.json(errorResponse(404, "Not Found"));
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
        await dbLayer.update(id, updateBody);
          ordered.Completed.map(async (item, index) => (await dbLayer.update(parseInt(item.id), { sortNo: index })));
          ordered.SentToCounter.map(async (item, index) => (await dbLayer.update(parseInt(item.id), { sortNo: index })));
          ordered.Processing.map(async (item, index) => (await dbLayer.update(parseInt(item.id), { sortNo: index })));
          return res.json(successResponse(200, "Successfull", {}));
      } else {
        return res.json(errorResponse(404, "Not Found"));
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
