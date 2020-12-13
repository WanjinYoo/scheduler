import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/show";
import Confirm from "components/Appointment/confirm";
import Saving from "components/Appointment/Saving";
import Error from "components/Appointment/error";
import Form from "components/Appointment/form";
import UseVisualMode from "hooks/useVisualMode";







export default function appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM"
  const { mode, transition, back } = UseVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW));
  }

  const deleteSchedule = (id) => {
    props.deleteInterview(id)
    .then(() => transition(EMPTY));
  }
  

  return (
    <article className="appointment">
    <Header time = {props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete = {() => {
      transition(CONFIRM);
    }}
    />
    )}
     {mode === CREATE && (<Form onSave = {(id,interviewer) => {
       save(id,interviewer)
     }}
      interviewers = {props.interviewers} onCancel = {() => back()}/>)}  
    {mode === SAVING && <Saving message = "SAVING"/>} 
    {mode === CONFIRM && <Confirm message = "Do you want to delete the interview?" onCancel = {() => back()}
    onConfirm = {() => {
      deleteSchedule(props.id);
    }}/>} 
    
    </article>
  )
}
