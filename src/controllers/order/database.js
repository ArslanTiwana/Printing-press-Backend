const models = require("../../database/models");

class dbLayer {
    static async getById(id) {
        return await models.Order.findByPk(id);
    }
    static async getAll() {
        return await models.Order.findAll();
    }
    static async getByClient(clientId) {
        console.log(clientId)
        return await models.Order.findAll({
            where:{
                clientId:clientId
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