var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.index);
router.get('/userList', usersController.list);
router.get('/userCreate', usersController.create);
router.post('/userCreate', usersController.processCreate);
router.get('/userDetail/:id', usersController.detail);
router.get('/userEdit/:id', usersController.edit);
router.put('/userEdit/:id', usersController.processEdit);
router.delete('/userDelete/:id',usersController.delete_account)
router.get('/search',usersController.search);


module.exports = router;
