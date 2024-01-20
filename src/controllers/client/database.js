const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Client.findAll();
    }
    static async create(body) {
        return await models.Client.create(body);
    }
    static async update(id,body) {
        return await models.Client.update(id,body);
    }
    static async findbyid(clientId) {
        return await models.Client.findAll({
            where: {
                id: clientId,
            },
        });
    }
    static async getByPhoneNumber(phoneNumber) {
        return await models.Client.findOne({
            where: {
                phoneNumber: phoneNumber,
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