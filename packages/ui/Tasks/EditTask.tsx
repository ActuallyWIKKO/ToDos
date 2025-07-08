export const EditTask: React.FC = () => {
  return (
    <><div> <a href="">Edit Task</a> </div>
    <form>
        <input
          type="text"
          name="newTask"
          placeholder="Edit task"
          value=""
        />
        <button className="editTask" type="submit">
          Submit
        </button>
      </form>
      </>
   
  )
}