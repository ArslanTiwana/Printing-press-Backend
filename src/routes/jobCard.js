const router = require("express").Router();
const jobCardController=require('../controllers/jobCard/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,jobCardController.create);
router.put("/update/:id",Authorization,jobCardController.update);
router.get("/get",Authorization,jobCardController.getAll);
router.get("/get/:id",Authorization,jobCardController.getById);
router.get("/get/client/:id",Authorization,jobCardController.getByClient);
router.delete("/delete/:id",Authorization,jobCardController.delete);
router.get("/invoice_jobcard_items/:id",Authorization,jobCardController.getInvoicejobCardItemsById);
router.get("/get_user_jobcards",Authorization,jobCardController.getAllofUser);

module.exports = router;
