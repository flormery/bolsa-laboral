var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req,res,next){
  email=req.body.email;
  password=req.body.password;

  dbConn.query("SELECT * FROM users WHERE email='"+email+"' AND password='"+password+"'",function(err,rows)     {
 
    if(err) {
        req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          //console.log(rows[0]["nombre"]);
          req.session.idu=rows[0]["id"];
          req.session.user=rows[0]["fullname"];
          req.session.email=rows[0]["email"];
          req.session.admin=true;
          res.redirect("/admin");
        }else{
          //req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
        }
        
        //res.render('books',{data:rows});
    }
  }
);


});

router.get('/admin', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/index');
  }else{
    res.redirect("/login");
  }
  
});
router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;