const router = require("express").Router();
const InvoiceController=require('../controllers/invoice/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,InvoiceController.create);
// router.put("/update/:id",Authorization,InvoiceController.update);
// router.delete("/delete/:id",Authorization,InvoiceController.delete);
// router.get("/get",Authorization,InvoiceController.getAll);
// router.get("/get/:id",Authorization,InvoiceController.getById);


module.exports = router;
