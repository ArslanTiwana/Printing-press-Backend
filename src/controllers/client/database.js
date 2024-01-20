const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.User.findAll();
    }
    static async create(body) {
        return await models.User.create(body);
    }
    static async update(id,body) {
        return await models.User.update(id,body);
    }
    static async findbyid(clientId) {
        return await models.User.findAll({
            where: {
                id: clientId,
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