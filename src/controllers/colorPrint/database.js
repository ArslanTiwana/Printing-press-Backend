const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.ColorPrint.findAll();
    }
    static async getById() {
        return await models.ColorPrint.findByPk(id);
    }
    static async create(body) {
        return await models.ColorPrint.create(body);
    }
    static async createBulk(body) {
        return await models.ColorPrint.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.ColorPrint.update(id,body);
    }
    static async findbyid(id) {
        return await models.ColorPrint.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.ColorPrint.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer