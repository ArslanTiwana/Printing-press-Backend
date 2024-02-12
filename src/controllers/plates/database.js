const models = require("../../database/models");
const db =require('../../database/models')
class dbLayer {
    static async getAll() {
        return await models.Plates.findAll();
  
    }
    static async getAllProcessing() {
        const result = await models.Plates.findAll({
            where: { status: 'Processing' },
            order: [['sortNo', 'ASC']],
          });
          return result
    }
    static async getAllPending(userId) {
        return await models.Plates.findAll({where:{status:'Pending',createdBy:userId}});
    }
    static async getAllForScrumBoard() {
        const data= await models.Plates.findAll();
        const response = data.map(item => {
            const updatedItem = { ...item.get({ plain: true }), id: item.id.toString() };
            return updatedItem;
        });        
        return response
    }
    static async getById(id) {
        return await models.Plates.findByPk(id);
    }
    static async create(body) {
        return await models.Plates.create(body);
    }
    static async createBulk(body) {
        return await models.Plates.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.Plates.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.Plates.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.Plates.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Plates.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer