class Cache {
  map: Map<string, Promise<any>>

  constructor() {
    this.map = new Map()
  }

  set = (key: string, value: Promise<any>) => {
    const promise = this.get(key)
    if (promise) return
    this.map.set(key, value)
    value.finally(() => {
      this.map.delete(key)
    })
  }

  get = (key: string) => {
    return this.map.get(key)
  }
}

const cache = new Cache()

export default {
  set: cache.set,
  get: cache.get
}
