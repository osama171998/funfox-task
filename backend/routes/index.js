var express = require('express');
var router = express.Router();
const UserController = require("../controllers/User")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'funfox' });
});
router.post('/api/login',UserController.login)
module.exports = router;
