const models = require("../../database/models");

class dbLayer {
    static async getUser(username) {
        return await models.User.findOne({ where: { username } });
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