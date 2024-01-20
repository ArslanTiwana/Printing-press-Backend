const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Offset.findAll();
    }
    static async getById() {
        return await models.Offset.findByPk(id);
    }
    static async create(body) {
        return await models.Offset.create(body);
    }
    static async createBulk(body) {
        return await models.Offset.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.Offset.update(id,body);
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