import styles from "./Task.module.css"
import Block from "../../Block/Block.jsx";
import {getData, removeTask, updateTask} from "../../../api.js";
import Timer from "../Timer/Timer.jsx";
import {useEffect, useState} from "react";
import {getSecondsPassed, getTimeLeft} from "../utils.js";
import classNames from "classnames";

const Task = ({task, updateTasks}) => {
   const [actualTask, setActualTask] = useState(task)
   const [isPlayingTimer, setIsPlayingTimer] = useState(!task.pause)

   const handleDone = async () => {
     await updateTask(task.id, {status: "done"})
     updateTasks()
   }

   const handlePause = async (isPlaying) => {
      setIsPlayingTimer(!isPlaying)

      if (isPlaying){
         const pause={
            date: Date.now(),
            timeLeft: getTimeLeft(task.date, task.duration)+actualTask.pauseDuration
         }
         const result= await updateTask(task.id, {pause})

         if (result)
            setActualTask(result)
      }else {
         console.log(actualTask)
         const seconds= getSecondsPassed(actualTask.pause.date, Date.now())
         const pauseDuration= actualTask.pauseDuration+seconds
         const result= await updateTask(task.id, {pause: false, pauseDuration})

         if (result)
            setActualTask(result)
      }

   }

   const handleRemove = async () => {
      await removeTask(task.id)
      updateTasks()
   }

   useEffect(() => {
      setActualTask(task)
   }, [task]);

   return (
       <Block className={classNames(styles.task, task.status!=="active" && styles[`task_${task.status}`])}>
          <h2 className={styles.title}>{task.title}</h2>
          {
             task.status==="active" &&
              <Timer task={task} updateTasks={updateTasks} isPlaying={isPlayingTimer}/>
          }

          <div className={styles.btns}>
             {
                task.status==="active" &&
                 <>
                    <button className={styles.btn_done} onClick={handleDone}>✔</button>
                    <button
                        className={styles.btn_pause}
                        onClick={() => handlePause(isPlayingTimer)}
                    >
                       {isPlayingTimer ? <>| |</> : <>►</>}
                    </button>
                 </>
             }

             <button onClick={handleRemove}>❌</button>
          </div>
       </Block>
   );
};

export default Task;
