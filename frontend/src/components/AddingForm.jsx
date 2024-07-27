import {useState} from 'react'
const AddingForm  = ({handleSubmit}) =>{
    const [newContent,setNewContent] = useState(null)
    const addNote = (event)=>{
        event.preventDefault()
        handleSubmit({
            content:newContent,
            important : true,
        })
        setNewContent('')

    }
    return(
    <div className="form-container">
        <form onSubmit = {addNote}>
            <label>enter your notes: </label>
            <input onChange ={e => {setNewContent(e.target.value)}}  />
            <button type='submit'>add</button>
        </form>
    </div>)
}
export default AddingForm