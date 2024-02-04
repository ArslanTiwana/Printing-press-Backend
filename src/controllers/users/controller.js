const { successResponse, errorResponse } = require("../../utils/response/response")
const { createAccessToken } = require('../../middlewares/jwt')
const bcrypt = require("bcrypt");
const dbLayer = require('./database')
const Service = require('./service')
const { getRandomPassword } = require('../../utils/constants/constants')
const { newUserEmail } = require('../../utils/constants/constants')
const moment = require('moment');

class UserController {
  static async login(req, res) {
    try {
      const { userName, password } = req.body;
      const userInfo = await dbLayer.getbyUserName(userName);
      if (!userInfo) {
        return res.json(errorResponse(404, "No User Exist with These Credentials"));
      }
      if (userInfo.status != 'active') {
        return res.json(errorResponse(401, "User is In Active"));
      }
      const passwordMatch = await bcrypt.compare(password, userInfo.password);
      console.log(password)
      if (!passwordMatch) {
        return res.json(errorResponse(500, "Invalid Password"));
      }
      const responseBody = { user: { userName: userInfo.userName, userType: userInfo.userType }, token: createAccessToken(userInfo) }
      // res.header('Authorization', createAccessToken(userInfo));
      return res.json(successResponse(200, "Authentication successful", responseBody));
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));

    }
  }

  static async register(req, res) {
    try {
      const { userType } = req.body
      const password = await getRandomPassword();
      console.log(password)
      const newPassword = await Service.hashedPassword(password)
      const userInfo = await dbLayer.getByUserType(userType);
      const userName = `${userType}${(userInfo.length) + 1}`;
      console.log(userName)
      const body = {
        userName: userName,
        password: newPassword,
        userType: userType
      }
      const user = await dbLayer.createUser(body)
      if (user) {
        newUserEmail('muhammadarslan0111@gmail.com', userName, password)
        return res.json(successResponse(201, "Successfull", { userName: userName, password: password }));
      } else {
        return res.json(errorResponse(401, "User not created"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async getAll(req, res) {
    try {
      const users = await dbLayer.getAll()
      if (users) {
        return res.json(successResponse(200, "Successfull", users));
      }
      else {
        return res.json(errorResponse(404, "User Not Found"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params

      const users = await dbLayer.getById(id)
      if (users) {
        const result = await dbLayer.delete(id)
        return res.json(successResponse(200, "Successfull", users));
      }
      else {
        return res.json(errorResponse(404, "User Not Found"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const users = await dbLayer.getById(id)
      if (users) {
        return res.json(successResponse(200, "Successfull", users));
      }
      else {
        return res.json(errorResponse(404, "User Not Found"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }



  static async update(req, res) {
    try {
      const { id } = req.params
      const body = req.body
      const users = await dbLayer.getById(id)
      if (users) {
        const updatedUser = await dbLayer.update(id, body)
        return res.json(successResponse(200, "Successfull"));
      }
      else {
        return res.json(errorResponse(404, "User Not Found"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }

  static async resetPassword(req, res) {
    try {
      const { id } = req.params
      const users = await dbLayer.getById(id)
      let password = await getRandomPassword();
      const hashedpassword = await Service.hashedPassword(password)
      if (users) {
        await dbLayer.update(id, { password: hashedpassword })
        return res.json(successResponse(200, "Successfull", { newGeneratedPassword: password }));
      }
      else {
        return res.json(errorResponse(404, "User Not Found"));
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
  static async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body
    try {
      const userInfo = await dbLayer.getbyUserName(req.user.userName);
      if (userInfo) {
        const passwordMatch = await bcrypt.compare(currentPassword, userInfo.password);
        if (passwordMatch) {
          const password = await Service.hashedPassword(newPassword)
          const updated = await dbLayer.update(userInfo.id, { password: password })

          return res.json(successResponse(200, "Successfull"));
        } else {
          return res.json(errorResponse(401, "Current Password is not Correct"));
        }

      } else {
      }
    } catch (error) {
      console.log(error)
      return res.json(errorResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = UserController;
