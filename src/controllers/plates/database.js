const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Plates.findAll();
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
        return await models.Plates.update(id,body);
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