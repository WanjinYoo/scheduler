import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = () => {
    if(props.spots === 0 ) {
      return "no spots remaining"
    }
    else if (props.spots === 1){
      return `${props.spots} spot remaining`
    }
    else {
      return `${props.spots} spots remaining`
    }
  }

  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected
  });

  return (
    <li 
    className= {DayListItemClass} 
    onClick={() => props.setDay(props.name)}>
      <h2 className= "day-list">{props.name}</h2>
      <h3>{formatSpots()}</h3>
    </li>
  );
}