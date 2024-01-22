const models = require("../../database/models");

class dbLayer {
    static async getById(id) {
        return await models.Order.findByPk(id);
    }
    static async getDetailsById(id) {
        return await models.Order.findOne({
            where:{
                id:id
            }
            ,
        include: [
            { model: models.Plates },
            { model: models.ColorPrint },
            { model: models.WeddingCard },
            { model: models.Panaflex },
            { model: models.Film },
            { model: models.Offset },
        ]
        });
    }
    static async getAll() {
        return await models.Order.findAll();
    }
    static async getByClient(clientId) {
        return await models.Order.findAll({
            where:{
                clientId:clientId
            }
            ,
        include: [
            { model: models.Plates },
            { model: models.ColorPrint },
            { model: models.WeddingCard },
            { model: models.Panaflex },
            { model: models.Film },
            { model: models.Offset },
        ]
        });
    }
    static async delete(id) {
        return await models.Order.destroy({where:{id:id}});
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