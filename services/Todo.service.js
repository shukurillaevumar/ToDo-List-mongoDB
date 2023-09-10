const Todo = require("../dataBase/models/todo.model");

async function getAll() {
  return await Todo.find();
}

async function getById(res, id) {
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: "Todo is not found" });
  }
  return res.status(200).json(todo);
}

async function create(res, { title, completed }) {
  const todo = await new Todo({
    title,
    completed,
  });

  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function validateCreateInputs(req, res) {
  const { title, completed } = req.body;
  const result = {};

  if (!title) {
    return res.status(404).json({ error: "Title is not found" });
  }
  result.title = title;

  if (completed === undefined) {
    return res.status(404).json({ error: "Completed is not found" });
  }
  result.completed = completed;

  return result;
}

async function validateUpdateInputs({ title, completed }) {
  const result = {};
  if (title) {
    result.title = title;
  }
  if (completed) {
    result.completed = completed;
  }

  return result;
}

async function update(id, dataForUpdate, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(id, dataForUpdate, { new: true });
    if (!todo) {
      res.status(404).json({ error: "Todo is not found" });
    } else {
      res.json({ result: "Todo was successfully updated" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function remove(res, id) {
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json("Todo is not found");
    } else {
      res.send("Todo has been deleted");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAll,
  validateCreateInputs,
  create,
  getById,
  validateUpdateInputs,
  update,
  remove,
};
