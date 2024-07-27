import PropTypes from 'prop-types'
const LoginForm = ({password,username,usernameChangeHanlder,passChangeHandler,onLogin}) =>{
  
  return(<div>
    <form onSubmit = {onLogin}>
    <div>
        Username <input data-testid = 'username' value ={username} onChange ={usernameChangeHanlder} />
    </div>
    <div>
        Password <input data-testid = 'password' type ="password" value={[password]} onChange ={passChangeHandler} />
    </div>
    <div>
        <button type = "submit">login</button>
    </div>
    </form>
  </div>)
}
LoginForm.PropTypes = {
  onLogin : PropTypes.func.isRequired,
  usernameChangeHanlder : PropTypes.func.isRequired,
  passChangeHandler : PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  
}
export default LoginForm