import axios from 'axios'

const baseUrl = 'http://localhost:5000/calendar'

const get = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  get
}