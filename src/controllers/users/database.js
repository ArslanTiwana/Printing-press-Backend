const models = require("../../database/models");

class dbLayer {

    static async getbyEmail(email) {
        return await models.User.findOne({
            where: {
                email: email,
            },
        });
    }
    static async createUser(body) {
        return await models.User.create(body);
    }
    static async findUser(keyword) {
        return await models.User.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer