var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET users listing. */
router.post('/', function(req, res, next) {
 console.log(req.body)
 const {  title } = req.body;
 if( !(title)) { res.status(400).json('lack of data'); return }
 
 var newBoard= new db.Board({
    id: Math.random()*100,
    title: title,
    lists: []
 })

 newBoard.save()
 .then(item => {
    res.send("item saved to database");
    console.log('added');
 })
 .catch(err => {
    res.status(400).send("unable to save to database");
 });
 
});

router.get('/:id', function(req,res,next){
   db.Board.findOne({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.delete('/:id', function(req,res,next){
   db.Board.findOneAndDelete({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.put('/', function(req,res,next){

  const {  title, order, id, lists } = req.body;
  if( !(title && order && id && lists )) { res.status(400).json('lack of data'); return }
  
   db.Board.updateOne(
    {id: id},
    {
        id: id,
        title: title,
        lists: lists
     },
     (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

module.exports = router;