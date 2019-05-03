var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET users listing. */
router.post('/', function(req, res, next) {
 console.log(req.body)
 const {  title, order, taskList, boardId } = req.body;
 if( !(title && order && taskList && boardId)) { res.status(400).json('lack of data'); return }
 
 var newList= new db.List({
    id: Math.random()*100,
    title: title,
    order: order,
    taskList: taskList,
    boardId: boardId
 })

 newList.save()
 .then(item => {
    res.send("item saved to database");
    console.log('added');
 })
 .catch(err => {
    res.status(400).send("unable to save to database");
 });
 
});

router.get('/:id', function(req,res,next){
   db.List.findOne({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.delete('/:id', function(req,res,next){
   db.List.findOneAndDelete({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.put('/', function(req,res,next){

  const {  title, order, id, taskList, boardId } = req.body;
  if( !(title && order && id && taskList && boardId )) { res.status(400).json('lack of data'); return }
  
   db.List.updateOne(
    {id: id},
    {
        id: id,
        title: title,
        order: order,        
        taskList: taskList,
        boardId: boardId
     },
     (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

module.exports = router;

