const models = require("../../database/models");

class dbLayer {
    static async getById(id) {
        return await models.Order.findOne(id);
    }
    static async getByClient(clientId) {
        return await models.Order.findAll({
            where:{
                clientId
            }
        });
    }
    static async create(body) {
        return await models.Order.create(body);
    }
    // static async findUser(keyword) {
    //     return await models.User.findAll({
    //         where: {
    //             name: keyword,
    //         },
    //     });
    // }
}
module.exports = dbLayer