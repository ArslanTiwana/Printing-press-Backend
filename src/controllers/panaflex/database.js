const models = require("../../database/models");
const db = require('../../database/models')

class dbLayer {
    static async getAll() {
        return await models.Panaflex.findAll();
    }
    static async getAllPending(userId) {
        return await models.Panaflex.findAll({ where: { status: 'Pending', createdBy: userId } });
    }
    static async getById(id) {
        const query = `
        SELECT p.*,c.name as "clientName",c."phoneNumber"
        FROM "Panaflex" p
        INNER JOIN "JobCard" jc ON jc.id = p."jobCardId"
        INNER JOIN "Client" c ON c.id = jc."clientId"
        WHERE p.id = ${id}
    `;
        const [result, metadata] = await db.sequelize.query(query)
        return result
    }
    static async create(body) {
        return await models.Panaflex.create(body);
    }
    static async createBulk(body) {
        return await models.Panaflex.bulkCreate(body);
    }
    static async update(id, body) {
        return await models.Panaflex.update(body, { where: { id: id } });
    }
    static async delete(id) {
        return await models.Panaflex.destroy({ where: { id: id } });
    }
    static async findbyid(id) {
        return await models.Panaflex.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Panaflex.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer