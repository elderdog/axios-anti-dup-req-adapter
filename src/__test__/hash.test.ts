import { describe, expect, it } from 'vitest'
import type { AxiosRequestConfig } from 'axios'
import hash from '../utils/hash'

describe.concurrent('hash', () => {
  it('treat as same config', () => {
    const config1: AxiosRequestConfig = {
      baseURL: 'https://jsonplaceholder.typicode.com',
      url: '/posts/1',
      method: 'GET',
      params: { a: 1, b: 2 },
      data: { a: 1, b: 2 },
      responseType: 'json'
    }
    const config2: AxiosRequestConfig = {
      baseURL: 'https://jsonplaceholder.typicode.com/',
      url: '/posts/1',
      method: 'get',
      params: { b: 2, a: 1 },
      data: { b: 2, a: 1 },
      responseType: 'json'
    }
    expect(hash(config1)).eq(hash(config2))
  })

  it('treat as different config', () => {
    const config1: AxiosRequestConfig = {
      baseURL: 'https://jsonplaceholder.typicode.com',
      url: '/posts/1',
      method: 'GET',
      params: { a: 1, b: 2 },
      data: { a: 1, b: 2 },
      responseType: 'json'
    }
    const config2: AxiosRequestConfig = {
      baseURL: 'https://jsonplaceholder.typicode.com/',
      url: '/posts/1',
      method: 'PUT',
      params: { b: 2, a: 1 },
      data: { b: 2, a: 1 },
      responseType: 'json'
    }
    expect(hash(config1)).not.eq(hash(config2))
  })

  it('treat as different config', () => {
    const config1: AxiosRequestConfig = {
      baseURL: 'https://jsonplaceholder.typicode.com',
      url: '/posts/1',
      method: 'GET',
      data: { a: 1, b: 2 },
      responseType: 'json'
    }
    const config2: AxiosRequestConfig = {
      baseURL: 'https://jsonplaceholder.typicode.com',
      url: '/posts/1',
      method: 'GET',
      params: { a: 1, b: 2 },
      responseType: 'json'
    }
    expect(hash(config1)).not.eq(hash(config2))
  })
})
