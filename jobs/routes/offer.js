var express = require('express');
const offerController = require('../controllers/offerController')
var router = express.Router();
const multer = require('../middlewares/multer')

/* GET home page. */
router.get('/showOfferForm/:company_id', offerController.showFormOffer);

router.post('/addOffer/:company_id',multer("offers"), offerController.addOffer);

router.get('/showEditOffer/:offer_id', offerController.showEditOffer);

router.post('/editOffer/:offer_id/:company_id', offerController.editOffer);

router.get('/deleteOffer/:offer_id/:company_id', offerController.deleteOffer);

router.get('/logicDeleteOffer/:offer_id/:company_id', offerController.logicDeleteOffer)

module.exports = router;
