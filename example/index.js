import axios from 'axios'
import adapter from '../dist/index.js'

const example = () => {
  const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    adapter
  })
  api.get('/posts/1')
}

example()
