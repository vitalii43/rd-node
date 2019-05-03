var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/trelloDB");

var taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    order: String,
    description: String,
    assignee: String,
    listId: String
});

var listSchema = new mongoose.Schema({
    id: String,
    title: String,
    order: String,
    boardId: String,
    taskList: Array
})

var boardSchema = new mongoose.Schema({
    id: String,
    title: String,
    lists: Array
})

var userSchema = new mongoose.Schema({
    id: String,
    title: String,
    email: String
})

module.exports.Task = mongoose.model('Task', taskSchema)
module.exports.User = mongoose.model('User', userSchema)
module.exports.List = mongoose.model('List', listSchema)
module.exports.Board = mongoose.model('Board', boardSchema)