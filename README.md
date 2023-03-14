# axios-anti-dup-req-adapter
Axios adapter which prevents instance from sending duplicate requests
- this adapter generates a hash code signature from an `axios request`
- requests have the same `url`, `method`, `params`, `data`, `responseType` result the same signature
- requests which have the same signature are treated as duplicate requests
- before sending a request to server, this adapter will check whether there is a pending request which has the same signature (let's call the pending one `primary request`)
  - if so, the current request will not be sent to server, it will be redirected to the `primary request`
  - if not, the current request will be set into a cache as the `primary request`
  - when the `primary request` is fulfilled, it will be cleared from the cache

## Install
```shell
npm install axios-anti-dup-req-adapter
```

## Quick Start
### Basic usage
``` javascript
import axios from 'axios'
import adapter from 'axios-anti-dup-req-adapter'

const instance = axios.create({ baseURL: 'http://example.base', adapter })

// you can use the feature of the adapter now
instance.get(/** your code*/)
```

### Disable cache
> use `config.useAdra: false` to disable cache, this property defaults to `true`
``` javascript
/**
 * sometimes you don't want to use the cache
 * for example your request needs a different response for each invocation
 */
instance.get('/random/number', { useAdra: false })
```

### Use your customized adapter
> inside this adapter, we use `axios.defaults.adapter` as network request adapter by default, if you wanna use your customized adapter, do it like this
``` javascript
import axios from 'axios'
import adapter, { adapterEnhancer } from 'axios-anti-dup-req-adapter'

const myAdapter = /** implement your adapter */
const instance = axios.create({
  baseURL: 'http://example.base',
  { adapter: adapterEnhancer(myAdapter) }
})

// you can use the feature of both adapters now
instance.get(/** your code*/)
```
