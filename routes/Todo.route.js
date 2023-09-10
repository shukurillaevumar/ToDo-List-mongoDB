const express = require("express");
const router = express.Router();
const TodoService = require("../services/Todo.service");

router.get("/all", async (req, res) => {
  const Todo = await TodoService.getAll();
  res.json(Todo);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return TodoService.getById(res, id);
});

router.post("/create", async (req, res) => {
  const dataForCreate = await TodoService.validateCreateInputs(req, res);
  console.log(dataForCreate);
  return TodoService.create(res, dataForCreate);
});

router.put("/edit/:id", (req, res) => {
  const dataForUpdate = TodoService.validateUpdateInputs(req.body);
  const { id } = req.params;
  return TodoService.update(id, dataForUpdate, res);
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  return TodoService.remove(res, id);
});

module.exports = router;
