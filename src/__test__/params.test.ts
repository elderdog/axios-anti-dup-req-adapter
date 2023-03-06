import FormData from 'form-data'
import { describe, expect, it } from 'vitest'
import { isURLSearchParams, sortedParamsString, sortedDataStringOrBuffer } from '../utils/params'

describe.concurrent('isURLSearchParams', () => {
  it('expect truly return', () => {
    expect(isURLSearchParams(new URLSearchParams())).eq(true)
  })

  it('expect falsy return', () => {
    expect(isURLSearchParams('a=1&b=2')).eq(false)
    expect(isURLSearchParams({ a: 1, b: 2 })).eq(false)
  })
})

describe.concurrent('sortedParamsString', () => {
  it('same input same output', () => {
    expect(sortedParamsString('a=1&b=2')).eq(sortedParamsString('a=1&b=2'))
    expect(sortedParamsString({ a: 1, b: 2 })).eq(sortedParamsString({ a: 1, b: 2 }))
    expect(sortedParamsString(new URLSearchParams('a=1&b=2'))).eq(sortedParamsString(new URLSearchParams('a=1&b=2')))
  })

  it('different input same different', () => {
    expect(sortedParamsString('a=1&b=2')).not.eq(sortedParamsString('a=2&b=1'))
    expect(sortedParamsString({ a: 1, b: 2 })).not.eq(sortedParamsString({ a: 2, b: 1 }))
    expect(sortedParamsString(new URLSearchParams('a=1&b=2'))).not.eq(sortedParamsString(new URLSearchParams('a=2&b=1')))
  })

  it('order should not matter', () => {
    expect(sortedParamsString('a=1&b=2')).eq(sortedParamsString('b=2&a=1'))
    expect(sortedParamsString({ a: 1, b: 2 })).eq(sortedParamsString({ b: 2, a: 1 }))
    expect(sortedParamsString(new URLSearchParams('a=1&b=2'))).eq(sortedParamsString(new URLSearchParams('b=2&a=1')))
  })

  it('type should not matter', () => {
    expect(sortedParamsString('a=1&b=2')).eq(sortedParamsString({ a: '1', b: '2' }))
    expect(sortedParamsString({ a: '1', b: '2' })).eq(sortedParamsString(new URLSearchParams('a=1&b=2')))
  })
})

describe.concurrent('sortedDataStringOrBuffer', () => {
  it('same input same output', () => {
    const formData = new FormData()
    formData.append('a', '1')
    formData.append('b', '2')
    const buffer = Buffer.from('hello, world!')
    expect(sortedDataStringOrBuffer('a=1&b=2')).eq(sortedDataStringOrBuffer('a=1&b=2'))
    expect(sortedDataStringOrBuffer({ a: 1, b: 2 })).eq(sortedDataStringOrBuffer({ a: 1, b: 2 }))
    expect(sortedDataStringOrBuffer(formData)).eq(sortedDataStringOrBuffer(formData))
    expect(sortedDataStringOrBuffer(buffer)).eq(sortedDataStringOrBuffer(buffer))
  })

  it('different input same different', () => {
    expect(sortedDataStringOrBuffer('a=1&b=2')).not.eq(sortedDataStringOrBuffer('a=2&b=1'))
    expect(sortedDataStringOrBuffer({ a: 1, b: 2 })).not.eq(sortedDataStringOrBuffer({ a: 2, b: 1 }))
  })

  it('order should not matter', () => {
    expect(sortedDataStringOrBuffer('a=1&b=2')).eq(sortedDataStringOrBuffer('b=2&a=1'))
    expect(sortedDataStringOrBuffer({ a: 1, b: 2 })).eq(sortedDataStringOrBuffer({ b: 2, a: 1 }))
  })

  it('type should not matter', () => {
    expect(sortedDataStringOrBuffer('a=1&b=2')).eq(sortedDataStringOrBuffer({ a: '1', b: '2' }))
    expect(sortedDataStringOrBuffer({ a: '1', b: '2' })).eq(sortedDataStringOrBuffer(new URLSearchParams('a=1&b=2')))
  })
})
