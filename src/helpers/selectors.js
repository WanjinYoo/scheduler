// takes a state and a day as a input, returns the appointments from given day
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
//Add a interviewer detail to the state
export function getInterview(state, interview) {
  const interviews = {};
  let isEmpty = true;
  if(interview){
  interviews['student'] = interview.student;
  interviews['interviewer'] = state.interviewers[interview.interviewer];
  isEmpty = false;
  }
  if(isEmpty) return null;
  return interviews;
}
// takes a state and a day as a input, returns the interviewrs from given day
export function getInterviewersForDay(state, day) {
  const filteredState = state.days.filter((item) => item.name === day);
  const resultArray = [];
  if(filteredState.length === 0)  return resultArray;
  else{
  
  for (const keys of Object.keys(state.interviewers)){
    if(filteredState[0].interviewers.includes(parseInt(keys))) {
      resultArray.push(state.interviewers[keys])
    }
  }
}
  return resultArray;
}