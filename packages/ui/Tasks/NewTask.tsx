import React, { useState } from "react";
import axios from "../../../apps/frontend/node_modules/axios";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export const NewTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");

  const createNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTask.trim()) return;

    try {
      const response = await axios.post<Task>("http://localhost:1199/tasks", {
        task: newTask,
      });
      setNewTask("");
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
          placeholder="Add a task..."
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