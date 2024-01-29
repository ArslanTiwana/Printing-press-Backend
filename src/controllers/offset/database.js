const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Offset.findAll();
    }
    static async getById(id) {
        return await models.Offset.findByPk(id);
    }
    static async getAllPending() {
        return await models.Offset.findAll({where:{status:'pending'}});
    }
    static async create(body) {
        return await models.Offset.create(body,{where:{id:id}});
    }
    static async createBulk(body) {
        return await models.Offset.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.Offset.update(id,body);
    }
    static async delete(id) {
        return await models.Client.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.Offset.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Offset.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer