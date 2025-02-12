import styles from "./Filter.module.css"
import Block from "../../Block/Block.jsx";
import {useEffect, useState} from "react";
import classNames from "classnames";

const Filter = ({tasks, setFilterTasks}) => {
   const [filter, setFilter] = useState("")

   const getClassName = (btn) => {
     return classNames(styles.btn, btn===filter && styles.active)
   }

   useEffect(() => {
      setFilter("active")
   }, []);

   useEffect(() => {
      const res=tasks.filter(task=> task.status===filter)
      setFilterTasks(res)
   }, [filter, tasks]);

   return (
       <Block className={styles.filter}>
          <button
              className={getClassName("active")}
              onClick={()=> setFilter("active")}
          >
             Активные
          </button>
          <button
              className={getClassName("done")}
              onClick={()=> setFilter("done")}
          >
             Выполненные
          </button>
          <button
              className={getClassName("expired")}
              onClick={()=> setFilter("expired")}
          >
             Проваленные
          </button>
       </Block>
   );
};

export default Filter;
