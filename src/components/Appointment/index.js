import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/show";
import Confirm from "components/Appointment/confirm";
import Delete from "components/Appointment/delete";
import Error from "components/Appointment/error";
export default function appointment(props) {
  return (
    <article className="appointment">
    <Header time = {props.time}/>
    {props.interview && <Show 
     student={props.interview.student} 
     interviewer={props.interview.interviewer} 
     onDelete={props.onDelete}
     onEdit={props.onEdit}
     />}
    {!props.interview && <Empty 
    onAdd = {props.onAdd} />}
    </article>




    
  )
}
