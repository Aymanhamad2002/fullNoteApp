import { useState, useEffect ,useRef} from "react";
import Notes from "./components/Notes";
import Header from "./components/Header";
import Helper from "./services/helper";
import AddingForm from "./components/AddingForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import loginHelper from "./services/login"
import Togglable from "./components/Togglable";
const App = () => {
  const [notes,setNotes] = useState(null)
  const [showAll,setShowAll] = useState(true)
  const [notifcation,setNotification] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)


  const notesToShow = showAll ? notes : notes.filter(note => note.important == true) 
  
  const handleShowAll = () => {
    setShowAll(!showAll)
  }

  const usernameChangeHanlder = (event) => {
    setUsername(event.target.value)

  }
  const passChangeHandler = (event) => {
    setPassword(event.target.value)

  }
  const onLogin = async ( event) => {
    event.preventDefault()
    const credentials = {username,password}
    try{
      const user = await loginHelper.login(credentials)
      console.log(user)
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      setUser(user)
      Helper.setToken(user.token)
      setUsername('')
      setPassword('')
    }catch(exception){
      setNotification('Wrong  credentials')
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
      
    


  }

  const handleImportanceChange = (id) => {
    const note = notes.find(note => note.id ===id)
    const newNote = {...note,important :!note.important}
    Helper
      .updateImportance(id,newNote)
      .then(updatedNote => {
        
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))})
  }

  const handleDelete = (id) =>{
  Helper
  .removeNote(id)
  .then(deletedNote => {

    setNotes(notes.filter(note => note.id !== deletedNote.id ))
    setNotification(`${deletedNote.content} removed from the list `)
    setTimeout(() => {setNotification(null)},5000)
  }
  )
  }
  const handleSubmit = (newNote)=>{
    noteFromRef.current.toggleVisibility()
    Helper
    .addNote(newNote)
    .then(addedNote =>{
       setNotes(notes.concat(addedNote))
       


    })
    .catch(error =>{
      setNotification(error.response.data.error)
      setTimeout(() => {setNotification(null)},5000)
    })

  }
  const handleChangeText = (event) => {
    setNewContent(event.target.value)

  }
  const loginForm = () => {
     return (
      <Togglable buttonLabel ="login" >
     
     <LoginForm usernameChangeHanlder={usernameChangeHanlder}
     passChangeHandler={passChangeHandler}
    password = {password}
    username = {username}
    onLogin={onLogin}

   />
   </Togglable>

    
)}
const noteFromRef = useRef()
 const addingForm = () => {
  
  return (
    <Togglable buttonLabel ="new note" ref ={noteFromRef}>
  <AddingForm
   handleSubmit={handleSubmit}/>
   </Togglable>

  )
  
}

  useEffect(()=>{
    Helper
    .getAll()
    .then(initialData => {
      
      setNotes(initialData)})
      
  },[])
  useEffect(() => {
    const loggedUserJSON =window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      Helper.setToken(user.token)
    }
  },[])

  if(notes === null){
    return null
  }else{
    return(
    <div>
      <Header text = "Notes"/>
      <Notification message ={notifcation}/>
      {user === null && loginForm()}
      {user !== null && <div><div><p>{user.username} logged-in  </p></div> {addingForm()}</div>}
      <button onClick={handleShowAll} className="toggle-button" >show {showAll ? "only important " : "all" }</button>
      <Notes data ={notesToShow} handleDelete ={handleDelete} handleImportanceChange ={handleImportanceChange}/>
      

    </div>)


  }
  

}
export default App 