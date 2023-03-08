import axios from 'axios'
import adapter from '../dist/index.js'

const example = async () => {
  const api = axios.create({ baseURL: '', adapter })
  const url = 'https://app.requestly.io/delay/1000/http://www.randomnumberapi.com/api/v1.0/randomuuid'
  const req1 = api.get(url).then(resp => resp.data.join())
  const req2 = api.get(url).then(resp => resp.data.join())
  const result = await Promise.race([req1, req2])
  req1.then(value => console.log(value === result ? 'Passed' : 'Failed'))
  req2.then(value => console.log(value === result ? 'Passed' : 'Failed'))
}

example()
