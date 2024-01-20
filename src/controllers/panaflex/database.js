const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Panaflex.findAll();
    }
    static async getById(id) {
        return await models.Panaflex.findByPk(id);
    }
    static async create(body) {
        return await models.Panaflex.create(body);
    }
    static async createBulk(body) {
        return await models.Panaflex.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.Panaflex.update(id,body);
    }
    static async findbyid(id) {
        return await models.Panaflex.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Panaflex.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer