import {useState} from "react";
import axios from "../../../apps/frontend/node_modules/axios";

type Task = {
    id: number;
    task: string;
}

export const Tasks:React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
           const fetchTask = async () => {
        try{
            const response = await axios.get<Task>("http://localhost:1199/tasks/")
            setTasks(response.data)
        }catch(err) {
            console.error(err);
            console.log("Fetching the data was not successful.")
        }
    }
  
    return (
        <section className="bg-base-100">
        <div>
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <p key={item.id} className="task">
              {item.id}
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