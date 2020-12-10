import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {

  const[state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {}
    }
  );
  console.log(state.appointments);
  let dailyAppointments = [];
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    })
  }, []);

  const setDay = day => setState({ ...state, day});
  dailyAppointments = getAppointmentsForDay(state,state.day);
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={day => setDay(day)}
        />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      
      { dailyAppointments.map((appointment) => {
        return (<Appointment 
          key={appointment.id} 
          {...appointment}   />)
      }) 
      } 
      <Appointment key="last" time="12pm" />
      </section>
    </main>
    
  );
}
