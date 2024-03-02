const models = require("../../database/models");
const db =require('../../database/models')
class dbLayer {
    static async getAll() {
        return await models.Plates.findAll();
  
    }
    static async getAllProcessing() {
        const result = await models.Plates.findAll({
            where: { status: 'Processing' },
            order: [['sortNo', 'ASC']],
          });
          return result
    }
    static async getAllPending(userId) {
        return await models.Plates.findAll({where:{status:'Pending',createdBy:userId}});
    }
    static async getAllForScrumBoard() {
        // const data= await models.Plates.findAll();
        const query = `
        SELECT p.*,c.name as "clientName",c."phoneNumber"
        FROM "Plates" p
        INNER JOIN "JobCard" jc ON jc.id = p."jobCardId"
        INNER JOIN "Client" c ON c.id = jc."clientId"
    `;      
        const [data, metadata] = await db.sequelize.query(query)
        const response = data.map(item => {
            const updatedItem = { ...item, id: item.id.toString() };
            return updatedItem;
        });        
        return response
    }
    static async getById(id) {
        const query = `
        SELECT p.*,c.name as "clientName",c."phoneNumber"
        FROM "Plates" p
        INNER JOIN "JobCard" jc ON jc.id = p."jobCardId"
        INNER JOIN "Client" c ON c.id = jc."clientId"
        WHERE p.id = ${id}
    `;        const [plate, metadata] = await db.sequelize.query(query)  
        return plate[0]
     }
    static async create(body) {
        return await models.Plates.create(body);
    }
    static async createBulk(body) {
        return await models.Plates.bulkCreate(body);
    }
    static async update(id,body) {
        return await models.Plates.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.Plates.destroy({where:{id:id}});
    }
    static async findbyid(id) {
        return await models.Plates.findAll({
            where: {
                id: id,
            },
        });
    }
    static async search(keyword) {
        return await models.Plates.findAll({
            where: {
                name: keyword,
            },
        });
    }
}
module.exports = dbLayer