const Note =({note,handleDelete,handleImportanceChange}) =>{
    return(<div className="note-item">
        <li>{note.content}
        <button onClick = {() =>{handleDelete(note.id)}}>delete</button>
        <button onClick ={()=>{handleImportanceChange(note.id)}}>make {note.important ? "not important": "important"}</button>
        </li>
        
    </div>)
}
export default Note