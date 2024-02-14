const models = require("../../database/models");
const db =require('../../database/models')

class dbLayer {
    static async getAll() {
        return await models.Film.findAll();
    }
    static async getAllPending(userId) {
        return await models.Film.findAll({where:{status:'Pending',createdBy:userId}});
    }
    static async getById(id) {
        const query = `
        SELECT p.*,c.name as "clientName",c."phoneNumber"
        FROM "Film" p
        INNER JOIN "JobCard" jc ON jc.id = p."jobCardId"
        INNER JOIN "Client" c ON c.id = jc."clientId"
        WHERE p.id = ${id}
    `;
        const [result, metadata] = await db.sequelize.query(query)
        return result
    }
    static async create(body) {
        return await models.Film.create(body);
    }
    static async update(id,body) {
        return await models.Film.update(body,{where:{id:id}});
    }
    static async createBulk(body) {
        return await models.Film.bulkCreate(body);
    }
    static async delete(id) {
        return await models.Film.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.Film.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Film.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer