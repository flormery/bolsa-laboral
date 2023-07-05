var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

/* GET home page. */
router.get('/categorias', function (req, res, next) {
    dbConn.query('SELECT * FROM categorias ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            
            res.render('admin/categoria-list',{data:''});   
        } else {
          
            res.render('admin/categoria-list',{data:rows});
        }
    });

  });

  module.exports = router;