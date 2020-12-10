export function getAppointmentsForDay(state, day) {
  const filteredState = state.days.filter((item) => item.name === day);
  const resultArray = [];
  if(filteredState.length === 0)  return resultArray;
  else{
  
  for (const keys of Object.keys(state.appointments)){
    if(filteredState[0].appointments.includes(parseInt(keys))) {
      resultArray.push(state.appointments[keys])
    }
  }
}
  return resultArray;
}