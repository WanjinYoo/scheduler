import React from 'react'
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
const interviewersList = props.interviewers.map((item) => {
  return (
    <InterviewerListItem 
    key={item.id}
    name = {item.name}
    avatar = {item.avatar}
    onChange = {(event) => props.onChange(item.id)}
    selected={item.id === props.value}
    />
  );
});


  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
