import axios from "axios";
const baseUrl = '/api/notes'
let token =  0 

const setToken  = newToken => {
    token = `Bearer ${newToken}`
}


const getAll = ()=>{
    const request = axios.get(baseUrl)
    return request.then(response =>response.data)
}
const removeNote = (id) => {
    const fullUrl = `${baseUrl}/${id}`
    const request = axios.delete(fullUrl)
    return request.then(response => response.data)
}
const addNote = async newObject =>{
    const config = {
        headers:{Authorization:token}
    }
    const response = await axios.post(baseUrl,newObject,config)
    return response.data
}
const updateImportance = (id,newObject) =>{
    const fullUrl = `${baseUrl}/${id}`
    const request = axios.put(fullUrl,newObject)
    return request.then(response => response.data)

}
export default {
    getAll,
    removeNote,
    addNote,
    updateImportance,
    setToken,
}