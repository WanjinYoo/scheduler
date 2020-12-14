import {useState,useEffect} from 'react'
import axios from 'axios'

export default function useApplicationData() {
  const[state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);
  const setDay = day => setState({ ...state, day});
  const getIdByDays = day => {
    const week = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    return week.indexOf(day);
  }
  function bookInterview(id, interview) {
    console.log(interview)
    return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = [
        ...state.days
      ]
      days[getIdByDays(state.day)].spots -= 1; 
      setState({
        ...state,
        appointments,
        days
      });
   
    })
  }
  function deleteInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, null)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = [
        ...state.days
      ]
      days[getIdByDays(state.day)].spots += 1; 
      console.log(state.days[0].spots);
      setState({
        ...state,
        appointments,
        days
      
      });
    })
  }
  return {state,setDay,bookInterview,deleteInterview}
}
