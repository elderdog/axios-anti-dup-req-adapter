import { describe, it, expect } from 'vitest'
import axios from 'axios'
import adapter from '../index'

describe.concurrent('when to use cache', () => {
  it('duplicate requests should use cache', async () => {
    const api = axios.create({ baseURL: '', adapter })
    const url = 'https://app.requestly.io/delay/1000/http://www.randomnumberapi.com/api/v1.0/randomuuid'
    const req1 = api.get(url).then(resp => resp.data.join())
    const req2 = api.get(url).then(resp => resp.data.join())
    const result = await Promise.race([req1, req2])
    await expect(req1).resolves.toBe(result)
    await expect(req2).resolves.toBe(result)
  }, 10000)

  it('different requests should have different responses', async () => {
    const api = axios.create({ baseURL: '', adapter })
    const url1 = 'https://app.requestly.io/delay/1000/http://www.randomnumberapi.com/api/v1.0/randomuuid'
    const url2 = 'https://app.requestly.io/delay/2000/http://www.randomnumberapi.com/api/v1.0/randomuuid'
    const result1 = await api.get(url1).then(resp => resp.data.join())
    const result2 = await api.get(url2).then(resp => resp.data.join())
    expect(result1).not.eq(result2)
  }, 10000)

  it('same-config request should not use cache if the previous one is settled', async () => {
    const api = axios.create({ baseURL: '', adapter })
    const url = 'https://app.requestly.io/delay/1000/http://www.randomnumberapi.com/api/v1.0/randomuuid'
    const result1 = await api.get(url).then(resp => resp.data.join())
    const result2 = await api.get(url).then(resp => resp.data.join())
    expect(result1).not.eq(result2)
  }, 10000)
})
