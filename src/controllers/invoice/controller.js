const { successResponse, errorResponse } = require("../../utils/response/response")
const dbLayer = require("./database");
const models = require("../../database/models");
const db=require("../../database/models");
const jobCard = require("../../database/models/jobCard");
class InvoiceController {

  static async create(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const body = req.body
      const {items,invoice}=body
      console.log(invoice)
      if(invoice){
        const updatejobCard=await models.JobCard.update({completeInvoiceCreated:invoice.completedjobCard},{ where: { id: invoice.jobCardId}} , {transaction })
        const createdInvoice = await models.Invoice.create({...invoice,createdBy:req.user.id}, { transaction });
      
      const platesArray = items.filter(item => (item.type === 'Plate'));
      const colorPrintsArray = items.filter(item => (item.type === 'Color Print'));
      const weddingCardsArray = items.filter(item => (item.type === 'Wedding Card'));
      const panaflexesArray = items.filter(item => (item.type === 'Panaflex'));
      const filmsArray = items.filter(item => (item.type === 'Film'))
      const offsetsArray = items.filter(item => (item.type === 'Offset') );
      console.log(createdInvoice)
      await Promise.all([
        ...platesArray.map(item => models.Plates.update({ ...item, invoiceId: createdInvoice.id }, { where: { id: item.id }, transaction })),
        ...colorPrintsArray.map(item => models.ColorPrint.update({ ...item, invoiceId: createdInvoice.id }, { where: { id: item.id }, transaction })),
        ...weddingCardsArray.map(item => models.WeddingCard.update({ ...item, invoiceId: createdInvoice.id }, { where: { id: item.id }, transaction })),
        ...panaflexesArray.map(item => models.Panaflex.update({ ...item, invoiceId: createdInvoice.id }, { where: { id: item.id }, transaction })),
        ...filmsArray.map(item => models.Film.update({ ...item, invoiceId: createdInvoice.id }, { where: { id: item.id }, transaction })),
        ...offsetsArray.map(item => models.Offset.update({ ...item, invoiceId: createdInvoice.id }, { where: { id: item.id }, transaction })),
      ]);
      await transaction.commit();
      console.log('Transaction committed successfully');
        return res.json(successResponse(201, "invoice created successfully", createdInvoice));
    }
    else{
      return res.json(errorResponse(404, "No Data Found"));

    }
    } catch (error) {
      console.log(error)
      await transaction.rollback();
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async update(req, res) {
    const body = req.body
    const {id}=req.params
    try {
      
      const result1 = await dbLayer.getById(id);
      if (result1) {
        console.log(body.phoneNumber)
        if(body.phoneNumber){
          const result=await dbLayer.getByPhoneNumber(body.phoneNumber)
          if(result && result.id!=result1.id){
            return res.json(errorResponse(404, "Phone Number You are Using is Already Used By another Client"));
          }
        }
        await dbLayer.update(id,body);
        return res.json(successResponse(200, "Successfull"));
      } else {
        return res.json(errorResponse(404, "No Client found with this id"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async search(req, res) {
    const keyword = req.query.search
    const result =await dbLayer.search(keyword)
    res.send(result);
  }
  static async getAll(req, res) {
    try {
      const result =await dbLayer.getAll()
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async getById(req, res) {
    try {
      const {id}=req.params
      const result =await dbLayer.getById(id)
      if (result) {
        return res.json(successResponse(200, "Successfull",result));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async delete(req, res) {
    try {
      const {id}=req.params
      
        const result = await dbLayer.getById(id)
        if (result) {
            await dbLayer.delete(id)
            return res.json(successResponse(200, "Successfull", result));
          } 
        else {
          return res.json(errorResponse(404, " Not Found"));
        }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = InvoiceController;
