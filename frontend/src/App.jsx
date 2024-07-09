import { useState, useEffect } from "react";
import Notes from "../components/Notes";
import Header from "../components/Header";
import Helper from "../services/helper";

const App = () => {
  const [notes,setNotes] = useState(null)
  useEffect(()=>{
    Helper
    .getAll()
    .then(initialData => {
      console.log(initialData)
      setNotes(initialData)})
      
  },[])

  if(notes === null){
    return null
  }else{
    return(
    <div>
      <Header text = "Notes"/>
      <Notes data ={notes} />

    </div>)


  }
  

}
export default App 