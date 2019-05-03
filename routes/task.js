var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET users listing. */
router.post('/', function(req, res, next) {
 console.log(req.body)
 const { title, order, description, assignee, id= Math.random()*100, listId=1 } = req.body;
 if( !(title && order && description && assignee && listId )) { res.status(400).json('lack of data'); return }
 
 var newTask = new db.Task({
    id: id,
    title: title,
    order: order,
    description: description,
    assignee: assignee,
    listId: listId,
 })

 newTask.save()
 .then(item => {
    res.send("item saved to database");
    console.log('added');
 })
 .catch(err => {
    res.status(400).send("unable to save to database");
 });
 
});

router.get('/:id', function(req,res,next){
   db.Task.findOne({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.delete('/:id', function(req,res,next){
   db.Task.findOneAndDelete({id: req.params.id}, (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

router.put('/', function(req,res,next){
   const { title, order, description, assignee, id, listId } = req.body;
   if( !(title && order && description && assignee && id && listId )) { res.status(400).json('lack of data'); return }
 
   console.log(!(title && order && description && assignee && id && listId ))
   db.Task.updateOne(
    {id: id},
    {
         id: id,
         title: title,
         order: order,
         description: description,
         assignee: assignee,
         listId: listId,
     },
     (err, doc) =>{
       if (err) return console.log(err)
       res.send(doc)
   })
})

module.exports = router;

