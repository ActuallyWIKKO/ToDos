import React, { useState } from "react";
import axios from "../../../apps/frontend/node_modules/axios";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

type NewTaskProps = {
  onNewTaskAdded: (task: Task) => void;
};

export const NewTask: React.FC<NewTaskProps> = ({ onNewTaskAdded }) => {
  const [newTask, setNewTask] = useState<string>("");

  const createNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTask.trim()) return;

    try {
      const response = await axios.post<Task>("http://localhost:1199/tasks", {
        task: newTask,
      });
      setNewTask("");
      onNewTaskAdded(response.data);
      // Insert some feedback for users here if the data send off was successful
    } catch (err) {
      console.log("Something went wrong while sending the data.");
      console.log("Here is why:");
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={createNewTask}>
        <input
          type="text"
          name="newTask"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button className="addTask" type="submit">
          Add
        </button>
      </form>
    </>
  );
};
