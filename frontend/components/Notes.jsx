import Note from "./Note";

const Notes = ({data}) =>{
    return(<div>
        <ul>
            {data.map(note =><Note key = {note.id} text ={note.content}/> )}
        </ul>
    </div>)
}
export default  Notes