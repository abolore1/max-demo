import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-app-917c0-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance