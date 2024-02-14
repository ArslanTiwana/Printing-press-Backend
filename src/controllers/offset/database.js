const models = require("../../database/models");
const db =require('../../database/models')

class dbLayer {
    static async getAll() {
        return await models.Offset.findAll();
    }
    static async getById(id) {
        const query = `
        SELECT p.*,c.name as "clientName",c."phoneNumber"
        FROM "Offset" p
        INNER JOIN "JobCard" jc ON jc.id = p."jobCardId"
        INNER JOIN "Client" c ON c.id = jc."clientId"
        WHERE p.id = ${id}
    `;
        const [result, metadata] = await db.sequelize.query(query)
        return result
    }
    static async getAllPending(userId) {
        return await models.Offset.findAll({where:{status:'Pending',createdBy:userId}});
    }
    static async create(body) {
        return await models.Offset.create(body);
    }
    static async createBulk(body) {
        return await models.Offset.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.Offset.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.Client.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.Offset.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Offset.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer