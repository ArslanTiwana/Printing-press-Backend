const models = require("../../database/models");
const generateUniqueId = () => {
    // Implement your logic to generate a unique identifier
    // This can be a UUID, timestamp, or any other method that ensures uniqueness
    return Math.random() + Date.now();
};
class dbLayer {
  
    
    static async getById(id) {
        return await models.Order.findByPk(id);
    }
    static async update(id,body) {
        return await models.Order.update(body,{where:{id:id}});
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
        return await models.Order.findAll({
            include: [
                { model: models.Client },
                { model: models.Invoice },
            ]
        }
        );
    }
    static async getInvoiceOrderItemsById(id) {
        const order= await models.Order.findOne({
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
        if (!order) {
            return null; 
        }
        const ResponseArray=[]
        ResponseArray.push(order.Plates.map((plate=>plate)))
        ResponseArray.push(order.WeddingCards.map((plate=>plate)))
        const resultArray = [
            ...(order.Plates ? order.Plates.map(plate => ({ ...plate.get({ plain: true }), type: 'Plate', uniqueId: generateUniqueId() })) : []),
            ...(order.ColorPrints ? order.ColorPrints.map(colorPrint => ({ ...colorPrint.get({ plain: true }), type: 'Color Print', uniqueId: generateUniqueId() })) : []),
            ...(order.WeddingCards ? order.WeddingCards.map(weddingCard => ({ ...weddingCard.get({ plain: true }), type: 'Wedding Card', uniqueId: generateUniqueId() })) : []),
            ...(order.Panaflexes ? order.Panaflexes.map(panaflex => ({ ...panaflex.get({ plain: true }), type: 'Panaflex', uniqueId: generateUniqueId() })) : []),
            ...(order.Films ? order.Films.map(film => ({ ...film.get({ plain: true }), type: 'Film', uniqueId: generateUniqueId() })) : []),
            ...(order.Offsets ? order.Offsets.map(offset => ({ ...offset.get({ plain: true }), type: 'Offset', uniqueId: generateUniqueId() })) : []),
        ];
        return resultArray
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