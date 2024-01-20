const router = require("express").Router();
const FilmController=require('../controllers/film/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,FilmController.getAll);
router.get("/get/:id",Authorization,FilmController.getById);


module.exports = router;
