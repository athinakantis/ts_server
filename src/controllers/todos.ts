import { RequestHandler } from 'express';
import { Todo } from '../models/todos';
import { db } from '../app';

export const createTodo: RequestHandler = (
  req,
  res,
  next
) => {
  const text = (req.body as {text: string}).text

  const newToDo = new Todo(Math.random().toString(), text)
  db.collection('todos').insertOne(newToDo)

  res.status(201).json({message: 'Create todo', createTodo: newToDo})
}

export const getToDos: RequestHandler = (req, res, next) => {
  const todos = db.collection('todos').find({})
  res.json({todos: todos})
}

export const updateToDo: RequestHandler<{id: string}> = (req, res, next) => {
    const toDoId = req.params.id
    const updatedText = (req.body as {text: string}).text

    const toDoToUpdate = db.collection('todos').find({id: toDoId})

    if (!toDoToUpdate) {
      res.status(500).json({message: 'Could not find to-do'})
    }

    const updatedToDo = new Todo(toDoId, updatedText)
    res.json({message: 'Updated todos', updateToDo: updatedToDo})
}

export const removeToDo: RequestHandler<{id: string}> = (req, res, next) => {
  const toDoId = req.params.id

  const toDoToUpdate = db.collection('todos').find({id: toDoId})
  
  if (!toDoToUpdate) {
    res.status(500).json({message: 'Could not find to-do'})
  }

  db.deleteOne({id: toDoId})
  res.json({message: 'To-do has been removed'})
}