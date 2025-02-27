---
head:
  - - meta
    - property: og:title
      content: reset
  - - meta
    - name: description
      content: Resets the fork back to its original state.
  - - meta
    - property: og:description
      content: Resets the fork back to its original state.

---

# reset

Resets the fork back to its original state.

## Usage

```ts
import { testClient } from '.'
 
await testClient.reset() // [!code focus]
```

## Parameters

### blockNumber (optional)

- **Type:** `bigint`

Resets the fork to a given block number.

```ts
await testClient.reset({
  blockNumber: 69420n, // [!code focus]
  jsonRpcUrl: 'https://mainnet.g.alchemy.com/v2'
})
```

### jsonRpcUrl (optional)

- **Type:** `string`

Resets the fork with a given JSON RPC URL.

```ts
await testClient.reset({
  blockNumber: 69420n,
  jsonRpcUrl: 'https://mainnet.g.alchemy.com/v2' // [!code focus]
})
```
