const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");
const { getIOInstance } = require('../../utils/WebSocket');

class FilmController {
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
        if(body.status != resp.status)
        {
          const io=getIOInstance()
          io.emit('updateBoard', {}); 
        }
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
  }  static async getAllForScrumBoard(req, res) {
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
  static async statusChange(req, res) {
    try {
      const { id } = req.params;
      const resp = await dbLayer.getById(id);
      if (resp) {
        const result = await dbLayer.update(id, {status:"Processing",sortNo:-1});
        const io=getIOInstance()
        io.emit('updateBoard', {}); 
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
        if (updateBody.status=="Completed" || resp.status=="Completed") ordered.Completed.map(async (item, index) => (await dbLayer.update(parseInt(item.id), { sortNo: index })));
        if (updateBody.status=="SentToCounter" || resp.status=="SentToCounter")  ordered.SentToCounter.map(async (item, index) => (await dbLayer.update(parseInt(item.id), { sortNo: index })));
        if (updateBody.status=="Processing" || resp.status=="Processing")  ordered.Processing.map(async (item, index) => (await dbLayer.update(parseInt(item.id), { sortNo: index }))); 
        return res.json(successResponse(200, "Successfull", {}));
      } else {
        return res.json(errorResponse(404, "Not Found"));
      }
    } catch (error) {
      console.log(error);
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = FilmController;
