const { successResponse, errorResponse } = require("../../utils/response/response")
const { createAccessToken } = require('../../middlewares/jwt')
const bcrypt = require("bcrypt");
const dbLayer = require('./database')
const Service = require('./service')
const { sendVerificationEmail, sendForgetPasswordEmail, sendForgetPasswordSMS, sendVerificationSMS } = require('../../utils/constants/constants')
const moment = require('moment');

class UserController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const userInfo = await dbLayer.getUser(username);
      if (!userInfo) {
        return res.json(errorResponse(404, "No User Exist with These Credentials"));
      }
      const passwordMatch = await bcrypt.compare(password, userInfo.password);
      if (!passwordMatch) {
        return res.json(errorResponse(500, "Invalid Password"));
      }
      res.header('Authorization', createAccessToken(userInfo));
      return res.json(successResponse(200, "Authentication successful", userInfo));
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));

    }
  }

  static async register(req, res) {
    try {
      const body = req.body
      body.password = await Service.hashedPassword(body.password)
      const user = await dbLayer.createUser(body)
      if (user) {
        return res.json(successResponse(201, "User created successfully", user));
      } else {
        return res.json(errorResponse(401, "User not created"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async forgetPassword(req, res) {
    const { username } = req.body
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const codeExpiry = moment(new Date()).unix() + 900
    try {
      const userInfo = await dbLayer.getUser(username);
      if (userInfo) {
        await userInfo.update({ verificationCode, codeExpiry })
        sendForgetPasswordEmail(username, verificationCode)
        return res.json(successResponse(200, "Forget Password Email Sent Successfully"));
      } else {
        return res.json(errorResponse(404, "No user found with this username"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async resetPassword(req, res) {
    const { password, username, code } = req.body
    const dt = moment(new Date()).unix()
    const newPassword = await Service.hashedPassword(password)
    try {
      const userInfo = await dbLayer.getUser(username);
      if (userInfo) {
        if (userInfo.codeExpiry > dt) {
          if (userInfo.verificationCode === code) {
            userInfo.update({ password: newPassword, verificationCode: null, codeExpiry: null })
          } else {
            return res.json(errorResponse(404, "The Code is In Valid"));
          }
        } else {
          return res.json(errorResponse(404, "The Code is Expired"));
        }
      } else {
        return res.json(errorResponse(404, "No user found with this username"));
      }
      return res.json(successResponse(200, "Password Reset Successfully"));
    }
    catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async search(req, res) {
    const keyword = req.query.search
    const users = dbLayer.findUser(keyword)
    res.send(users);
  }
}

module.exports = UserController;
