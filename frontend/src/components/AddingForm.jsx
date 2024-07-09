const AddingForm  = ({handleSubmit,handleChangeText}) =>{
    return(
    <div className="form-container">
        <form onSubmit = {handleSubmit}>
            <label>enter your notes: </label>
            <input onChange ={handleChangeText}  />
            <button type='submit'>add</button>
        </form>
    </div>)
}
export default AddingForm