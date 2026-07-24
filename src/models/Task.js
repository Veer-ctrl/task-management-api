import mongoose from "mongoose";
import { TASK_STATUS } from "../constants/taskStatus.js";
import { PRIORITIES } from "../constants/priorities.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    dueDate: {
      type: Date,
    },

    priority: {
      type: String,
      enum: Object.values(PRIORITIES),
      default: PRIORITIES.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;