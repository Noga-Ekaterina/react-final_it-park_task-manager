import {useEffect, useState} from "react";

export const useGetRem=()=>{
  const [rem, setRem] = useState(0)

  useEffect(() => {
    const handleResize=()=>{
      const screenWidth= document.documentElement.clientWidth
      setRem(screenWidth/ (screenWidth<=576? 576:1200))
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return rem
}