const models = require("../../database/models");

class dbLayer {
    static async getAll() {
        return await models.Invoice.findAll();
    }
    static async getById(id) {
        const invoice= await models.Invoice.findOne({
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
        if (!invoice) {
            return null; 
        }

        const resultArray = [
            ...(invoice.Plates ? invoice.Plates.map(plate => ({ ...plate.get(), type: 'Plate' })) : []),
            ...(invoice.ColorPrints ? invoice.ColorPrints.map(colorPrint => ({ ...colorPrint.get(), type: 'Color Print' })) : []),
            ...(invoice.WeddingCards ? invoice.WeddingCards.map(weddingCard => ({ ...weddingCard.get(), type: 'Wedding Card' })) : []),
            ...(invoice.Panaflexes ? invoice.Panaflexes.map(panaflex => ({ ...panaflex.get(), type: 'Panaflex' })) : []),
            ...(invoice.Films ? invoice.Films.map(film => ({ ...film.get(), type: 'Film', })) : []),
            ...(invoice.Offsets ? invoice.Offsets.map(offset => ({ ...offset.get(), type: 'Offset', })) : []),
        ];
        return {invoice:invoice, items:resultArray}
    }
    static async create(body) {
        return await models.Invoice.create(body);
    }
    static async update(id,body) {
        return await models.Invoice.update(body,{where:{id:id}});
    }
    static async delete(id) {
        return await models.Invoice.destroy({where:{id:id}});
    }
  
}
module.exports = dbLayer