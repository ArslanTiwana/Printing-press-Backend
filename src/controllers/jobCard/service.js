const {hash}=require('bcrypt')
class ServiceLayer {

    static  modifiedBody(body,id,userId) {
        const modifiedBody=body.map(item=>{
            return {
                ...item,
                status:item.status?"Processing":"Pending",
                sortNo:item.status?-1:null,
                jobCardId:id,
                createdBy:userId
            }
        })
        return modifiedBody
    }
}
module.exports=ServiceLayer