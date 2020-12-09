import React from 'react'
import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function InterviewerListItem(props) {
  const listItemClass = classnames("interviewers__item",{
    "interviewers__item--selected": props.selected,

  })
  return (
    <li 
    className={listItemClass}
    onClick={props.onChange}
    >
    <img
    className="interviewers__item-image"
    id = {props.id}
    src= {props.avatar}
    alt=  {props.name}
    />
     {props.name}
    </li>
  );
};

