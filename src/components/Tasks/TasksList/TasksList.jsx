import {useState} from "react";
import Filter from "../Filter/Filter.jsx";
import Task from "../Task/Task.jsx";

const TasksList = ({tasks, updateTasksList}) => {
   const [filterTasks, setFilterTasks] = useState([])


   return (
       <div>
          <Filter tasks={tasks} setFilterTasks={setFilterTasks}/>

          {
             filterTasks.map(task=>(
                 <Task key={task.id} task={task} updateTasks={updateTasksList}/>
             ))
          }
       </div>
   );
};

export default TasksList;
