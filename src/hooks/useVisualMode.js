import {useState} from "react"

export default function useVisualMode(initial) {
  const [mode,setMode] = useState(initial);
  const [history,setHistory] =useState([initial]);

  // switch mode to a new mode and store a previous mode to the history state
  const transition = (newMode,replace = false) => {
  setMode(newMode)
  if(!replace){
  setHistory((prev) => [...prev,newMode])
  }
  };
  // the mode changes to the privous mode using history state
  const back = () => {
    if(history.length > 1){
    history.pop();
    setMode(history[history.length - 1]);
    }
    else {
      return;
    } 
  }
  return { mode,transition,back };
}

