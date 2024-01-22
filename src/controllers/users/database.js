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
    static async getAll() {
        return await models.User.findAll();
    }
    static async getById(id) {
        return await models.User.findByPk(id);
    }
    static async update(id,body) {
        return await models.User.update(body,{where:{id:id}});
    }
    
    static async updateStatus(id,status) {
        return await models.User.update({status:status},{where:{id:id}});
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