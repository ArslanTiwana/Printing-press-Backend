const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Invoice.findAll();
    }
    static async getById(id) {
        return await models.Invoice.findByPk(id);
    }
    static async create(body) {
        return await models.Invoice.create(body);
    }
    static async update(id,body) {
        return await models.Invoice.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.Invoice.destroy({where:{id:id}});
    }
  
}
module.exports = dbLayer