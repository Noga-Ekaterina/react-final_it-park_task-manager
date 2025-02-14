import styles from "./TaskForm.module.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addTask} from "../../api.js";

const TaskForm = ({tasks, updateTasks}) => {
   const handlerSubmit = async ({title, duration}, {resetForm}) => {
      const getIdNewTasks = () => {
         let id;

         if (tasks.length == 0) {
            id = 1;
         } else {
            id = Number(tasks[tasks.length-1].id) + 1;
         }
         return String(id);
      };

      resetForm()

      await addTask({
         title,
         duration: duration*60,
         id: getIdNewTasks(),
         date: Date.now(),
         status: "active",
         pause: false,
         pauseDuration: 0
      })
      updateTasks()
   }
   
   const validate = (values) => {
     const errors={}

      for (let key in values) {
         if (values[key]==="")
            errors[key]= "заполните поле"
      }

      if (isNaN(values.duration))
         errors.duration= "укажите число"

      if (values.duration!=="" && values.duration<=0)
         errors.duration= "укажите значение больше нуля"

      return errors
   }

   return (
       <Formik
           initialValues={{title: "", duration: ""}}
           onSubmit={handlerSubmit}
           validate={validate}
       >
          <Form className={styles.form}>
             <div className={styles.input_wrap}>
                <Field
                    name="title"
                    placeholder="название задачи"
                    className={styles.input}
                />
                <ErrorMessage
                    component="span"
                    name="title"
                    className={styles.error}
                />
             </div>
             <div className={styles.input_wrap}>
                <Field
                    name="duration"
                    placeholder="время на задачу (в минутах)"
                    className={styles.input}
                />
                <ErrorMessage
                    component="span"
                    name="duration"
                    className={styles.error}
                />
             </div>
             <Field
                 type="submit"
                 value="добавит задачу"
                 className={styles.btn}
             />
          </Form>
       </Formik>
   );
};

export default TaskForm;
