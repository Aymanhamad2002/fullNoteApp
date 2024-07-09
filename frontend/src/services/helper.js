import axios from "axios";
const baseUrl = '/api/notes'

const getAll = ()=>{
    const request = axios.get(baseUrl)
    return request.then(response =>response.data)
}
const removeNote = (id) => {
    const fullUrl = `${baseUrl}/${id}`
    const request = axios.delete(fullUrl)
    return request.then(response => response.data)
}
const addNote = (newObject) =>{
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}
export default {
    getAll,
    removeNote,
    addNote,
}