const Note =({text}) =>{
    return(<div>
        <li>{text}</li>
        <button>delete</button>
        <button>toggleimportance</button>
    </div>)
}
export default Note