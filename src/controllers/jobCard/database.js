const models = require("../../database/models");
const generateUniqueId = () => {
    // Implement your logic to generate a unique identifier
    // This can be a UUID, timestamp, or any other method that ensures uniqueness
    return Math.random() + Date.now();
};
class dbLayer {


    static async getById(id) {
        return await models.JobCard.findByPk(id);
    }
    static async update(id, body) {
        return await models.JobCard.update(body, { where: { id: id } });
    }
    static async getDetailsById(id) {
        return await models.JobCard.findOne({
            where: {
                id: id
            }
            ,
            include: [
                { model: models.Plates },
                { model: models.ColorPrint },
                { model: models.WeddingCard },
                { model: models.Panaflex },
                { model: models.Film },
                { model: models.Offset },
                { model: models.OtherJob },
            ]
        });
    }
    static async getAll() {
        return await models.JobCard.findAll({
            include: [
                { model: models.Client },
                { model: models.Invoice },
            ]
        }
        );
    }
    static async getAllOfUser(userId) {
        return await models.JobCard.findAll({
            where: { createdBy: userId },
            include: [
                { model: models.Client },
                { model: models.Invoice },
            ]
        }
        );
    }

    static async getInvoicejobCardItemsById(id) {
        const jobCard = await models.JobCard.findOne({
            where: {
                id: id
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
        if (!jobCard) {
            return null;
        }
        const resultArray = [
            ...(jobCard.Plates ? jobCard.Plates.map(plate => ({ ...plate.get(), type: 'Plate', uniqueId: generateUniqueId() })) : []),
            ...(jobCard.ColorPrints ? jobCard.ColorPrints.map(colorPrint => ({ ...colorPrint.get(), type: 'Color Print', uniqueId: generateUniqueId() })) : []),
            ...(jobCard.WeddingCards ? jobCard.WeddingCards.map(weddingCard => ({ ...weddingCard.get(), type: 'Wedding Card', uniqueId: generateUniqueId() })) : []),
            ...(jobCard.Panaflexes ? jobCard.Panaflexes.map(panaflex => ({ ...panaflex.get(), type: 'Panaflex', uniqueId: generateUniqueId() })) : []),
            ...(jobCard.Films ? jobCard.Films.map(film => ({ ...film.get(), type: 'Film', uniqueId: generateUniqueId() })) : []),
            ...(jobCard.Offsets ? jobCard.Offsets.map(offset => ({ ...offset.get(), type: 'Offset', uniqueId: generateUniqueId() })) : []),
        ];
        return resultArray
    }
    static async getByClient(clientId) {
        return await models.JobCard.findAll({
            where: {
                clientId: clientId
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
        return await models.JobCard.destroy({ where: { id: id } });
    }
    static async create(body) {
        return await models.JobCard.create(body);
    }
  
}
module.exports = dbLayer