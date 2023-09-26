import { Task } from "../models/task.js";

export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const addNewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });
    res.json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });

    if (!tasks) {
      next(new ErrorHandler("No Tasks Found", 404));
    }
    console.log(tasks);
    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { isCompleted } = req.body;
    const exist = await Task.findById(id);
    if (!exist) {
      next(new ErrorHandler("Task Not Found", 404));
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );
    res.json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const task = await Task.findById(id);
    if (!task) {
      next(new ErrorHandler("Task Not Found", 404));
    }

    await Task.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
