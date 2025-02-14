export const getSecondsPassed = (date, newDate) => {
   const ms= newDate-date
   const secnds= Math.floor(ms/1000)

   return secnds
}
export const getTimeLeft = (date, duration) => {
   const seconds= getSecondsPassed(date, Date.now())
   console.log({duration: duration, initialRemainingTime: duration-seconds})

   return duration-seconds
}