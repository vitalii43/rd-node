var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET users listing. */
router.post('/', function(req, res, next) {
 console.log(req.body)
 const { name, email, password } = req.body;
 if( !(name && email && password )) { res.status(400).json('lack of data'); return }
 
 var newUser = new db.User({
    id: Math.random()*100,
    name: name,
    email: email,
    password: password
 })

 newUser.save()
 .then(item => {
    res.send("item saved to database");
    console.log('added');
 })
 .catch(err => {
    res.status(400).send("unable to save to database");
 });
 
});

router.get('/:id', function(req,res,next){
   db.User.findOne({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.delete('/:id', function(req,res,next){
   db.User.findOneAndDelete({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.put('/', function(req,res,next){

   const { name, email, password, id } = req.body;
   if( !( name && email && password && id )) { res.status(400).json('lack of data'); return }
   
   db.User.updateOne(
    {id: id},
    {
        id: id,
        name: name,
        email: email,
        password: password
     },
     (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

module.exports = router;

