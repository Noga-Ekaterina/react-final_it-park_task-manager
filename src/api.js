export const getData = async (url) => {
   try {
      const resp = await fetch(url);
      if (!resp.ok) {
         throw new Error("Ошибка получения данных");
      }
      const data = await resp.json();
      return data; // Возвращаем данные
   } catch (error) {
      return error.message; // Возвращаем сообщение об ошибке
   }
};

export const addTask = async (item) => {
   try {
      const resp = await fetch("/api", {
         method: "POST",
         headers: {
            "Content-type": "application/json",
         },
         body: JSON.stringify(item),
      });
      if (!resp.ok) {
         throw new Error("Ошибка добавления");
      }

      return await resp.json();
   } catch (error) {
      alert(error.message)
   }
};

export const updateTask = async (id ,patch) => {
   try {
      const resp = await fetch(`/api/${id}`, {
         method: "PATCH",
         headers: {
            "Content-type": "application/json",
         },
         body: JSON.stringify(patch),
      });

      if (!resp.ok) {
         throw new Error("Ошибка обновления");
      }

      return await resp.json();
   } catch (error) {
      alert(error.message)
   }
};

export const removeTask = async (id) => {
   try{
      const resp = await fetch(`/api/${id}`, {
         method: "DELETE",
      })
      if (!resp.ok) {
         throw new Error("Ошибка удаления")
      }
   }
   catch (error) {
      return error.message
   }
}

