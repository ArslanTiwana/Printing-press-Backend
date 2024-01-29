const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.WeddingCard.findAll();
    }
    static async getAllPending() {
        return await models.WeddingCard.findAll({where:{status:'pending'}});
    }
    static async getById(id) {
        return await models.WeddingCard.findByPk(id);
    }
    static async create(body) {
        return await models.WeddingCard.create(body);
    }
    static async createBulk(body) {
        return await models.WeddingCard.bulkCreate(body);
    }   
    static async update(id,body) {
        return await models.WeddingCard.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.WeddingCard.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.WeddingCard.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.User.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer