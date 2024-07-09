import Note from "./Note";

const Notes = ({data,handleDelete,handleImportanceChange}) =>{
    return(<div className="notes-container">
        <ul>
            {data.map(note =><Note key = {note.id} note ={note} handleDelete ={handleDelete} handleImportanceChange ={handleImportanceChange}/> )}
        </ul>
    </div>)
}
export default  Notes