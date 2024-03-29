const router = require("express").Router();
const ClientController=require('../controllers/client/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,ClientController.create);
router.put("/update/:id",Authorization,ClientController.update);
router.get("/get",Authorization,ClientController.getAll);
router.get("/get/:id",Authorization,ClientController.getById);
router.get("/search",Authorization,ClientController.search);
router.delete("/delete/:id",Authorization,ClientController.delete);
module.exports = router;
