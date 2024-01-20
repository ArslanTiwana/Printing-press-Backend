const {hash}=require('bcrypt')
class ServiceLayer {

    static async hashedPassword(password) {
        return await hash(password, 12).catch((err) => {
            console.log('error in Hashed Password!', err);
            return undefined;
          });
    }
}
module.exports=ServiceLayer