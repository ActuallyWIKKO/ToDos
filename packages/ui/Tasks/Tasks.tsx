import { useEffect, useState } from "react";
import axios from "../../../apps/frontend/node_modules/axios";
import { NewTask } from "./NewTask";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTask = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:1199/tasks/");
      setTasks(response.data);
    } catch (err) {
      console.log("Fetching the data was not successful.");
      console.log("Here is why:");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <section className="bg-base-100">
      <NewTask />
      <div>
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <p key={item.id} className="task">
              {item.id}
              <br></br>
              {item.task}
            </p>
          ))
        ) : (
          <p>No tasks yet</p>
        )}
      </div>
    </section>
  );
};