const {hash}=require('bcrypt')
class ServiceLayer {

    static  modifiedBody(body,id) {
        const modifiedBody=body.map(item=>{
            return {
                ...item,
                jobCardId:id
            }
        })
        return modifiedBody
    }
}
module.exports=ServiceLayer