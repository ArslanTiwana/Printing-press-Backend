const router = require("express").Router();
const jobCardController=require('../controllers/jobCard/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,jobCardController.create);
router.put("/update/:id",Authorization,jobCardController.update);
router.get("/get",Authorization,jobCardController.getAll);
router.get("/get/:id",Authorization,jobCardController.getById);
router.get("/get/client/:id",Authorization,jobCardController.getByClient);
router.delete("/delete/:id",Authorization,jobCardController.delete);
router.get("/invoice_jobCard_items/:id",Authorization,jobCardController.getInvoicejobCardItemsById);

module.exports = router;
