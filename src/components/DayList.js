import React from "react";
import DayListItem from "components/DayListItem";


export default function Button(props) {
  const daylist = props.days.map((items) => {
    return(
    <DayListItem 
    name={items.name} 
    spots={items.spots} 
    selected={items.name === props.day}
    setDay={props.setDay} />
    );
  })
   return (
     <ul>{daylist}</ul>
   );
 }