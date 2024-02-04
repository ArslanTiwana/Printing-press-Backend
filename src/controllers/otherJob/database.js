const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.OtherJob.findAll();
    }
    static async getAllPending(userId) {
        return await models.OtherJob.findAll({where:{status:'Pending',createdBy:userId}});
    }
    static async getAllForScrumBoard() {
        const data= await models.OtherJob.findAll();
        const response = data.map(item => {
            const updatedItem = { ...item.get({ plain: true }), id: item.id.toString() };
            return updatedItem;
        });        
        return response
    }
    static async getById(id) {
        return await models.OtherJob.findByPk(id);
    }
    static async create(body) {
        return await models.OtherJob.create(body);
    }
    static async createBulk(body) {
        return await models.OtherJob.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.OtherJob.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.OtherJob.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.OtherJob.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.OtherJob.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer