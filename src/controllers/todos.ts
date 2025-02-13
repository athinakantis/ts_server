import { RequestHandler } from 'express';
import { Todo } from '../models/todos';
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (
  req,
  res,
  next
) => {
  const text = (req.body as {text: string}).text

  const newToDo = new Todo(Math.random().toString(), text)
  TODOS.push(newToDo)

  res.status(201).json({message: 'Create todo', createTodo: newToDo})
}

export const getToDos: RequestHandler = (req, res, next) => {
  res.status(201).json({todos: TODOS})
}

export const updateToDo: RequestHandler<{id: string}> = (req, res, next) => {
    const toDoId = req.params.id
    const updatedText = (req.body as {text: string}).text

    const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId)
     
    if (toDoIndex < 0) {
      throw new Error('To-do not found')
    }

    TODOS[toDoIndex] = new Todo(TODOS[toDoIndex].id, updatedText)
    res.json({message: 'Updated todos', updateToDo: TODOS[toDoIndex]})
}

export const removeToDo: RequestHandler<{id: string}> = (req, res, next) => {
  const toDoId = req.params.id

  const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId)

  if (toDoIndex) {
    res.status(500).json({message: 'Could not find to-do to remove'})
  }
  TODOS.splice(toDoIndex, 1)
  res.json({message: 'To-do has been removed'})
}