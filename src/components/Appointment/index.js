import React from "react"
import {useEffect,useState} from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/show";
import Confirm from "components/Appointment/confirm";
import Saving from "components/Appointment/Saving";
import Error from "components/Appointment/error";
import Form from "components/Appointment/form";
import UseVisualMode from "hooks/useVisualMode";







export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR"
  const { mode, transition, back } = UseVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const [message,setMessage] = useState("");
  function save(name, interviewer, edit =false) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    setMessage("SAVING");
    props.bookInterview(props.id,interview, edit)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE,true));
  }

  const deleteSchedule = (id) => {
    transition(SAVING);
    setMessage("DELETING");
    props.deleteInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_SAVE,true));
  }
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);

  return (
    <article className="appointment" data-testid="appointment">
    <Header time = {props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete = {() => {
      transition(CONFIRM);
    }}
    onEdit = {() => {
      transition(EDIT);
    }}
    />
    )}
     {mode === CREATE && (<Form onSave = {(id,interviewer) => {
       save(id,interviewer)
     }}
      interviewers = {props.interviewers} onCancel = {() => back()}/>)}

      {mode === EDIT && (<Form onSave = {(id,interviewer) => {
        console.log(`editting`);
       save(id,interviewer,true);
     }}
      interviewers = {props.interviewers} onCancel = {() => back()}
      name = {props.interview.student}
      
      interviewer = {props.interview.interviewer.id}/>)}
      
      


    {mode === SAVING && <Saving message = {message}/>} 
    {mode === CONFIRM && <Confirm message = "Do you want to delete the interview?" onCancel = {() => back()}
    onConfirm = {() => {
      deleteSchedule(props.id);
    }}/>} 
    {mode === ERROR_SAVE && <Error message = "Error occured" onClose = {() => back()}/>} 
    
    </article>
  )
}
