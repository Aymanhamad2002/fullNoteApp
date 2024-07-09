import Note from "./Note";

const Notes = ({data,handleDelete}) =>{
    return(<div>
        <ul>
            {data.map(note =><Note key = {note.id} note ={note} handleDelete ={handleDelete}/> )}
        </ul>
    </div>)
}
export default  Notes