import Todo from "../models/todo.js";
import Joi from "joi";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ uid: req.user._id }).sort({ date: -1 });

    res.send(todos);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const createTodo = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, author, isComplete, date } = req.body;

  const uid = req.user._id;

  let todo = new Todo({
    // if key and value share the same name then you can just pass the value
    name,
    author,
    isComplete,
    date,
    uid,
  });

  try {
    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const updateTodo = async (req, res) => {
  // put requests replace existing document with a new one

  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found!");
    }

    if (todo.uid !== req.user._id) {
      return res
        .status(401)
        .send("You are not authorized to update this todo!");
    }

    const { name, author, isComplete, date, uid } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        name,
        author,
        isComplete,
        date,
        uid,
      },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const updateTodoStatus = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found!");
    }

    if (todo.uid !== req.user._id) {
      return res
        .status(401)
        .send("You are not authorized to update this todo!");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        isComplete: !todo.isComplete,
      },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found!");
    }

    if (todo.uid !== req.user._id) {
      return res
        .status(401)
        .send("You are not authorized to delete this todo!");
    }

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.send(deletedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};
