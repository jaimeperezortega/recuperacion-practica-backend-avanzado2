var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.masks = [
    {type: "FFP1", stock: 14, protection: 65},
    {type: "FFP2", stock: 4, protection: 93},
    {type: "FFP3", stock: 21, protection: 98}
  ];

  res.render('index');
});


module.exports = router;
