import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay,getInterview,getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();



  const dailyInterviewers = getInterviewersForDay(state,state.day);  
  // Interate through each appointment component to display 
  const schedule = getAppointmentsForDay(state,state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers = {dailyInterviewers}
        bookInterview = {bookInterview}
        deleteInterview = {deleteInterview}
      />
    );
  });

  
  return (
    <main className="layout">
      <section className="sidebar">
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
      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
