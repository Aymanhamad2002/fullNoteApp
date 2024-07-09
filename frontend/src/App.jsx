import { useState, useEffect } from "react";
import Notes from "./components/Notes";
import Header from "./components/Header";
import Helper from "./services/helper";
import AddingForm from "./components/AddingForm";

const App = () => {
  const [notes,setNotes] = useState(null)
  const [newContent,setNewContent] = useState(null)

  const handleDelete = (id) =>{
  Helper
  .removeNote(id)
  .then(deletedNote => 
    setNotes(notes.filter(note => note.id !== deletedNote.id ))
  )
  }
  const handleSubmit = (event)=>{
    event.preventDefault()
    const newNote = {
      content : newContent,
      important : Math.random() < 0.6
    }
    Helper
    .addNote(newNote)
    .then(addedNote => setNotes(notes.concat(addedNote)))

  }
  const handleChangeText = (event) => {
    setNewContent(event.target.value)

  }

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
      <AddingForm handleChangeText={handleChangeText} handleSubmit={handleSubmit}/>
      <Notes data ={notes} handleDelete ={handleDelete}/>
      

    </div>)


  }
  

}
export default App 