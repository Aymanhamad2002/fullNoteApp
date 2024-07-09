const Note =({note,handleDelete}) =>{
    return(<div>
        <li>{note.content}
        <button onClick = {() =>{handleDelete(note.id)}}>delete</button>
        <button>toggleimportance</button>
        </li>
        
    </div>)
}
export default Note