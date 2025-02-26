import {useEffect, useState} from 'react'
import TasksList from "./components/Tasks/TasksList/TasksList.jsx";
import {getData} from "./api.js";
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Block from "./components/Block/Block.jsx";
import MainTitle from "./components/MainTitle/MainTitle.jsx";

function App() {
   const [tasks, setTasks] = useState(null)

   const fetchTasks = async ()=>{
      const data= await getData("/api")
      setTasks(data)
   }

   useEffect(() => {
      fetchTasks()
   }, []);

  return (
    <div className="container">
       <MainTitle/>
       {
          !tasks? <Block>Загрузка</Block> : typeof tasks==="string" ?<Block>{tasks}</Block>:
              <>
                 <TaskForm tasks={tasks} updateTasks={fetchTasks}/>
                 <TasksList tasks={tasks}       updateTasksList={fetchTasks}/>
              </>
       }
    </div>
  )
}

export default App
