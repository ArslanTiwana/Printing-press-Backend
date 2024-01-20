const { passport } = require("../../utils/passport/config");
const { successResponse, errorResponse } = require("../../utils/response/response")
const { createAccessToken } = require('../../middlewares/jwt')
const bcrypt = require("bcrypt");
const DbLayer = require('./database')
const Service = require('./service')
const { sendVerificationEmail, sendForgetPasswordEmail, sendForgetPasswordSMS, sendVerificationSMS } = require('../../utils/constants/constants')
const moment = require('moment');
const models = require("../../database/models");
const { Op, Sequelize } = require("sequelize");
const dbLayer = require("./database");

class ClientController {

  static async create(req, res) {
    try {
      const body = req.body
      const client = await DbLayer.create(body)
      if (client) {
        return res.json(successResponse(201, "Client created successfully", client));
      } else {
        return res.json(errorResponse(401, "Client not created"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async update(req, res) {
    const body = req.body
    const id=req.params
    try {
      const userInfo = await DbLayer.findbyid(id);
      if (userInfo) {
        await DbLayer.update(id,body);
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
    const users = dbLayer.search(keyword)
    res.send(users);
  }
}

module.exports = ClientController;
