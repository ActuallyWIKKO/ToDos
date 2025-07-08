import { useEffect, useState } from "react";
import axios from "../../../apps/frontend/node_modules/axios";
import { NewTask } from "./NewTask";
import { EditTask } from "./EditTask";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmDeleteID, setConfirmDeleteID] = useState<number | null>(null);

  const fetchTask = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Task[]>("http://localhost:1199/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.log("Fetching the data was not successful.");
      console.log("Here is why:");
      console.error(error);
      setError("Fetching the data was not successful.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:1199/task/${id}`);
      setTasks((previousTask) => previousTask.filter((task) => task.id !== id));
    } catch (error) {
      console.log("Failed to delete the task.");
      console.log("Here is why:");
      console.error(error);
    }
  };

  const handleEditing = async (updatedTask: Task) => {
    try {
      await axios.put(
        `http://localhost:1199/task/${updatedTask.id}`,
        updatedTask
      );
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update task. :( Try again later.");
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <section className="bg-base-100">
      {loading && <p className="text-gray-600">Loading tasks...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <NewTask onNewTaskAdded={handleTaskAdded} />
          <div>
            {tasks.length > 0 ? (
              tasks.map((item) => (
                <div key={item.id}>
                  {confirmDeleteID === item.id ? (
                    <>
                      <p>Delete this task?</p>
                      <button onClick={() => handleDelete(item.id)}>
                        Yes
                      </button>{" "}
                      <button onClick={() => setConfirmDeleteID(null)}>
                        No
                      </button>
                    </>
                  ) : editingTask?.id === item.id ? (
                    <EditTask
                      task={editingTask}
                      onSave={handleEditing}
                      onCancel={() => setEditingTask(null)}
                    />
                  ) : (
                    <>
                      <p className="task">
                        {item.task}
                      </p>
                      <button onClick={() => setEditingTask(item)}>
                        Edit Task
                      </button>
                      <div>
                        <button onClick={() => setConfirmDeleteID(item.id)}>
                          Delete Task
                        </button>
                      </div>
                    </>
                  )}
                  <br />
                </div>
              ))
            ) : (
              <p>No tasks yet</p>
            )}
          </div>
        </>
      )}
    </section>
  );
};
