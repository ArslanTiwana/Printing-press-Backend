const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Client.findAll();
    }
    static async getById(id) {
        return await models.Client.findByPk(id);
    }
    static async create(body) {
        return await models.Client.create(body);
    }
    static async update(id,body) {
        return await models.Client.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.Client.destroy({where:{id:id}});
    }
 
    static async getByPhoneNumber(phoneNumber) {
        return await models.Client.findOne({
            where: {
                phoneNumber: phoneNumber,
            },
        });
    }   
    static async search(keyword) {
        return await models.Client.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer