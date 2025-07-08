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

const handleDelete = async (id:number) => {
    try {
     await axios.delete(`http://localhost:1199/task/${id}`)
     setTasks((previousTask) => previousTask.filter((tasks) => tasks.id !== id));   
    } catch (err) {
        console.log("Failed to delete the task.");
        console.log("Here is why:");
        console.error(err);
    }
}


  useEffect(() => {
    fetchTask();
  }, []);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  return (
    <section className="bg-base-100">
       <NewTask onNewTaskAdded={handleTaskAdded} />
      <div>
        {tasks.length > 0 ? (
          tasks.map((item) => (
           <> <p key={item.id} className="task">
              {item.id}
              <br/>
              {item.task}
            </p>
            <p>
              <EditTask/>
          <div> <a href="">Delete Task</a></div>
          <p>Delete this task? <a href="" onClick={() => handleDelete(item.id)}>Yes.</a><a href="" onClick={ () => {}}>No.</a></p>
            </p>
             <br/>
            </>
          ))
        ) : (
          <p>No tasks yet</p>
        )}
      </div>
    </section>
  );
};