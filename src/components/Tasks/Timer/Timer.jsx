import styles from "./Timer.module.css"
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {useGetRem} from "./useGetRem";
import {updateTask} from "../../../api.js";
import {getTimeLeft} from "../utils.js";

const Timer = ({task, updateTasks, isPlaying}) => {
   const rem= useGetRem()

   const getInitialRemainingTime = () => {
      if (task.pause)
         return task.pause.timeLeft
      else
         return getTimeLeft(task.date, task.duration) + task.pauseDuration
   }

   const handleComplete = () => {
      setTimeout(async ()=>{
         alert(`Задача ${task.title} провалена`)
         await updateTask(task.id, {status: "expired"})
         updateTasks()
      }, 1000)
   }

   const initialRemainingTime= getInitialRemainingTime()

   return (
       <CountdownCircleTimer
         duration={task.duration}
         initialRemainingTime={initialRemainingTime>=0? initialRemainingTime:0}
         isPlaying={isPlaying}
         size={110*rem}
         strokeWidth={5*rem}
         colors={"#362085"}
         onComplete={handleComplete}
       >
          {({ remainingTime }) => {
             if (remainingTime === 0) {
                return <div className={styles.timer}>время вышло</div>;
             }

             const seconds= remainingTime%60
             const allMinutes= Math.floor(remainingTime/60)
             const hours= Math.floor(allMinutes/60)
             const minutes= hours>0? hours%60 : allMinutes

             return (
                <div className={styles.timer}>
                   {`${hours} : ${minutes} : ${seconds}`}
               </div>
            );
         }}
       </CountdownCircleTimer>
   );
};

export default Timer;
