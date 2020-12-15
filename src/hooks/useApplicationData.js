import {useReducer,useEffect} from 'react'
import axios from 'axios'

export default function useApplicationData() {
  
 
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";



//const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      }
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days:action.days,
        appointments: action.appointments,
        interviewers: action.interviewers

       }
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: action.appointments,
      }
    }
    case SET_SPOTS: {
      return {
        ...state,
        days: action.days
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
const [state, dispatch] = useReducer(reducer,{
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

  // useEffect(() => {
  //   socket.onmessage = message => {
  //     getData();
  //   }
  //  return () => {
  //   socket.close();
  //   }
  // }, []);


  const getData = () => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
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

  function bookInterview(id, interview) {
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
     // days[getIdByDays(state.day)].spots -= 1; 
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
