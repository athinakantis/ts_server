"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToDo = exports.updateToDo = exports.getToDos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newToDo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newToDo);
    res.status(201).json({ message: 'Create todo', createTodo: newToDo });
};
exports.createTodo = createTodo;
const getToDos = (req, res, next) => {
    res.status(201).json({ todos: TODOS });
};
exports.getToDos = getToDos;
const updateToDo = (req, res, next) => {
    const toDoId = req.params.id;
    const updatedText = req.body.text;
    const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId);
    if (toDoIndex < 0) {
        throw new Error('To-do not found');
    }
    TODOS[toDoIndex] = new todos_1.Todo(TODOS[toDoIndex].id, updatedText);
    res.json({ message: 'Updated todos', updateToDo: TODOS[toDoIndex] });
};
exports.updateToDo = updateToDo;
const removeToDo = (req, res, next) => {
    const toDoId = req.params.id;
    const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId);
    if (toDoIndex < 0) {
        res.status(500).json({ message: 'To-do not found' });
    }
    TODOS.splice(toDoIndex, 1);
    res.json({ message: 'To-do has been removed' });
};
exports.removeToDo = removeToDo;
