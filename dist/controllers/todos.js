"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToDo = exports.updateToDo = exports.getToDos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const app_1 = require("../app");
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newToDo = new todos_1.Todo(Math.random().toString(), text);
    app_1.db.collection('todos').insertOne(newToDo);
    res.status(201).json({ message: 'Create todo', createTodo: newToDo });
};
exports.createTodo = createTodo;
const getToDos = (req, res, next) => {
    const todos = app_1.db.collection('todos').find({});
    res.json({ todos: todos });
};
exports.getToDos = getToDos;
const updateToDo = (req, res, next) => {
    const toDoId = req.params.id;
    const updatedText = req.body.text;
    const toDoToUpdate = app_1.db.collection('todos').find({ id: toDoId });
    if (!toDoToUpdate) {
        res.status(500).json({ message: 'Could not find to-do' });
    }
    const updatedToDo = new todos_1.Todo(toDoId, updatedText);
    res.json({ message: 'Updated todos', updateToDo: updatedToDo });
};
exports.updateToDo = updateToDo;
const removeToDo = (req, res, next) => {
    const toDoId = req.params.id;
    const toDoToUpdate = app_1.db.collection('todos').find({ id: toDoId });
    if (!toDoToUpdate) {
        res.status(500).json({ message: 'Could not find to-do' });
    }
    app_1.db.deleteOne({ id: toDoId });
    res.json({ message: 'To-do has been removed' });
};
exports.removeToDo = removeToDo;
