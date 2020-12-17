import {useReducer,useEffect} from 'react'
import axios from 'axios'
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
} from "reducers/application";

export default function useApplicationData() {
 


const [state, dispatch] = useReducer(reducer,{
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

  useEffect(() => {
    const socket = new WebSocket("ws://wanjin-sheduler.herokuapp.com");
    socket.onmessage = message => {
      getData();
    }
   return () => {
    socket.close();
    }
  }, []);


  const getData = () => {
    Promise.all([
      axios.get('./api/days'),
      axios.get('./api/appointments'),
      axios.get('./api/interviewers')
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }

  useEffect(() => {
    getData();
  }, []);


  const setDay = day => dispatch({
    type:SET_DAY,
    day
  })


  const getIdByDays = day => {
    const week = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    return week.indexOf(day);
  }

  function bookInterview(id, interview, edit = false) {

    return axios.put(`./api/appointments/${id}`,{interview})
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
      if(!edit){
      days[getIdByDays(state.day)].spots -= 1; 
      }
      dispatch({
        type: SET_INTERVIEW,
        appointments: appointments,
      })
      dispatch({
        type: SET_SPOTS,
        days: days,
      })
   
    })
  }
  function deleteInterview(id) {
    return axios.delete(`./api/appointments/${id}`, null)
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
      dispatch({
        type: SET_INTERVIEW,
        appointments: appointments,
      })
      dispatch({
        type: SET_SPOTS,
        days: days,
      })
    })
  }
  return {state,setDay,bookInterview,deleteInterview}
}
