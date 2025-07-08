import { useState } from "react"

type Task = {
  id : number;
  task: string;
  completed: boolean;
}

interface EditTaskProps {
  task: Task;
  onSave: (updatedTask : Task) => void;
  onCancel: () => void;
}

export const EditTask: React.FC<EditTaskProps> = ({task, onSave, onCancel}) => {
  const [text, setText] = useState(task.task);
  const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ ...task, task: text});
    }
  return (
    <>
    <label> <a href="">Edit Task</a> </label>
    <form onSubmit={handleSubmit}>
       <textarea
        className="w-full p-2 border rounded mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
        <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded">
          Cancel
        </button>
        </div>
      </form>
      </>
   
  )
}