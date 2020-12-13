import React from "react";
import DayListItem from "components/DayListItem";


export default function dayList(props) {
  const daylist = props.days.map((items,index) => {
    return(
    <DayListItem 
    key = {index}
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