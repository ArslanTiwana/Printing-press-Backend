const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Film.findAll();
    }
    static async getById(id) {
        return await models.Film.findByPk(id);
    }
    static async create(body) {
        return await models.Film.create(body);
    }
    static async update(id,body) {
        return await models.Film.update(id,body);
    }
    static async createBulk(body) {
        return await models.Film.bulkCreate(body);
    }
    static async findbyid(id) {
        return await models.Film.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Film.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer