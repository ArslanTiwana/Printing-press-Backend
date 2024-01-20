const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Firm.findAll();
    }
    static async getById() {
        return await models.ColorPrint.findByPk(id);
    }
    static async create(body) {
        return await models.Firm.create(body);
    }
    static async update(id,body) {
        return await models.Firm.update(id,body);
    }
    static async createBulk(body) {
        return await models.Firm.bulkCreate(body);
    }
    static async findbyid(id) {
        return await models.Firm.findAll({
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