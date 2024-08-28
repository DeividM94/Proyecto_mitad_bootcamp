var express = require('express');
const companyController = require('../controllers/companyController');
var router = express.Router();
const multer = require('../middlewares/multer')


router.get('/showRegister', companyController.showRegister);

router.post('/register', companyController.register);

router.get('/oneCompany/:id', companyController.showOneCompany);

router.get('/showEditCompany/:company_id', companyController.showEdit);

router.post('/editCompany/:company_id',multer("company"), companyController.editCompany);

router.get('/logicDelCompany/:company_id', companyController.logicDelCompany)

router.get('/deleteCompany/:company_id', companyController.deleteCompany)


module.exports = router;
