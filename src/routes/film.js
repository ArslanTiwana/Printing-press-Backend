const router = require("express").Router();
const FilmController=require('../controllers/film/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,FilmController.getAll);
router.get("/get/:id",Authorization,FilmController.getById);
router.post("/create",Authorization,FilmController.create);
router.put("/update/:id",Authorization,FilmController.update);
router.delete("/delete/:id",Authorization,FilmController.delete);

module.exports = router;
